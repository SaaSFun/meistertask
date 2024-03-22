// import npm packge
import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import * as moment from "moment";
import TextareaAutosize from 'react-autosize-textarea';
import { UncontrolledPopover, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,//
		Card, CardHeader, CardBody, CardText, ListGroup, ListGroupItem, InputGroup, InputGroupText,//
		UncontrolledDropdown, Badge, DropdownToggle, DropdownMenu, DropdownItem, CardTitle, CardSubtitle,//
		UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Dropdown, FormGroup, Label } from 'reactstrap';
import MDEditor, {  } from '@uiw/react-md-editor';
import { LightgalleryProvider, LightgalleryItem, ItemTitle, LinesEllipsis } from "react-lightgallery";
import DatePicker from "react-datepicker";
import Select, { components, StylesConfig } from 'react-select';
// import service api
import ServiceTinfo  from '../../services/ServiceTinfo';  
import ServiceWtags  from '../../services/ServiceWtags';  
import ServiceFile  from '../../services/ServiceFile';  
import ServiceTlist  from '../../services/ServiceTlist';  
import ServiceTtime  from '../../services/ServiceTtime';  
import ServiceTfield  from '../../services/ServiceTfield';  
// import core class
import Util from '../../core/util';
import { CHECK_OUT_TIME } from '../../core/constant';
// import com page
//
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
import { FcBusinessman, FcBusinesswoman, FcLike, FcCheckmark, FcCloseUpMode } from "react-icons/fc";
import { FaRegFaceSmile, FaRegFaceSurprise } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineMoreHoriz, MdOutlinePushPin, MdOutlineVisibility,//
		MdOutlineCloudUpload, MdOutlineAdd, MdOutlineClear, MdCheckCircleOutline, MdOutlineAddReaction, MdOutlineCalendarMonth, MdOutlinePlayCircle,//
		MdOutlineDeleteSweep, MdOutlineDone, MdOutlineClose, MdOutlineDoDisturbAlt, MdOutlineStopCircle
} from "react-icons/md";
import { LiaTagsSolid } from "react-icons/lia";
import { PiArchiveDuotone, PiVinylRecordBold, PiCopySimpleBold } from "react-icons/pi";
import { MdDoneAll, MdOutlineFreeCancellation, MdSettingsBackupRestore, MdRunningWithErrors } from "react-icons/md";
import chroma from 'chroma-js';
import './default.css'
// coding
const { Option } = components;
const CustomSelectOption = props => (
	<Option {...props} className={`d-flex align-items-center gap-1`}>
	    <div className={`hover-effect-none bg-transparent border-0 ms-1 px-0 py-0 d-flex align-self-start avatar-name`}>
	        <img className={`rounded-circle bg-light border`} src={props.data.avatar} alt="avatar" />
	    </div>
	    {props.data.label}
    </Option>
);
const CustomSelectValue = props => (
	<div className={`d-flex align-items-center gap-1`}>
    	<div className={`hover-effect-none bg-transparent border-0 ms-1 px-0 py-0 d-flex align-self-start avatar-name`}>
	        <img className={`rounded-circle bg-light border`} src={props.data.avatar} alt="avatar" />
	    </div>
    	{props.data.label}
    </div>
);
const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.background);
        return {
            ...styles,
            backgroundColor: isDisabled ?
                undefined :
                isSelected ?
                data.background :
                isFocused ?
                color.alpha(0.1).css() :
                undefined,
            color: isDisabled ?
                '#ccc' :
                isSelected ?
                chroma.contrast(color, 'white') > 2 ?
                'white' :
                'black' :
                data.background,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ?
                    isSelected ?
                    data.background :
                    color.alpha(0.3).css() :
                    undefined,
            },
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.background);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.background,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.background,
        ':hover': {
            backgroundColor: data.background,
            color: 'white',
        },
    }),
}
const TrackingTime = ($this) => {
    // state to store time
    const [time, setTime] = useState($this.task_time);
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState($this.isRunning);
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);
    // Hours calculation
    const hours = Math.floor(time / 3600);
    // Minutes calculation
    const minutes = Math.floor((time % 3600) / 60);
    // Seconds calculation
    const seconds = Math.floor(time % 60);
    // Method to start and stop timer
    const startAndStop = () => {
        if (!isRunning) {
        	let objTask = {};
	    	let _tasks = $this.wms_class.comStage.state.objData.tasks.map(item => ({...item}));
	    	let _findIndex = _.findIndex(_tasks, {uid: parseInt($this.task_id)});
			if (!['complete', 'failure', 'cancel', 'inprocess'].includes(_tasks[_findIndex]['result'])) {
	    		_tasks[_findIndex]['result'] = 'inprocess';
	    		objTask.result = 'inprocess';
	    	}
			if (objTask.result) {
				$this.wms_class.updateTinfo($this.task_id, objTask, function(res){
					if (!res.status) {
						Util.toast(res.error, 'error');
						return;
					}
					const newState = {
				        ...$this.wms_class.comStage.state,
				        objData: {
				            ...$this.wms_class.comStage.state.objData,
				            tasks: _tasks,
				        }
				    }
				    $this.wms_class.comStage.setState(newState);
				    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
				})
			}
        	ServiceTtime.instance.checkinTime($this.task_id, {start_time: moment().format("YYYY-MM-DD HH:mm:ss"), check_out_time: CHECK_OUT_TIME}).then(({ data }) => {
	            if (data.status) {
        			setIsRunning(!isRunning);
        			const newState = {
				        ...$this.wms_class.comStage.state,
				        objData: {
				            ...$this.wms_class.comStage.state.objData,
				            task_id: $this.task_id,
				            tasktime: time,
				            isRunning: true
				        }
				    }
				    $this.wms_class.comStage.setState(newState);
				    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
	            } else {
	            	Util.toast(data.error, 'error');
	            }
	        })
        } else {
        	ServiceTtime.instance.checkoutTime($this.task_id, {end_time: moment().format("YYYY-MM-DD HH:mm:ss")}).then(({ data }) => {
	            if (data.status) {
        			setIsRunning(!isRunning);
        			const newState = {
				        ...$this.wms_class.comStage.state,
				        objData: {
				            ...$this.wms_class.comStage.state.objData,
				            task_id: -1,
				            tasktime: time,
				            isRunning: false
				        }
				    }
				    $this.wms_class.comStage.setState(newState);
				    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
	            } else {
	            	Util.toast(data.error, 'error');
	            }
	        })
        }
    };
    return (
    	<div className={`btn btn-sm d-flex align-self-center px-1 py-0 gap-1 ${isRunning ? 'btn-danger outline-danger text-white' : 'btn-default'}`}
            title={'Track Time'}
            style={{cursor: 'pointer', height: `var(--pix-h-31)`}}
        >
            {!isRunning && (<MdOutlinePlayCircle size="27" className={`btn btn-transparent btn-sm outline-transparent rounded-circle p-1`} onClick={() => startAndStop()} />)}
            {isRunning && (<MdOutlineStopCircle size="27" className={`btn btn-transparent btn-sm outline-transparent rounded-circle text-white p-1`} onClick={() => startAndStop()} />)}
        	<span className={`d-flex align-self-center small`}
        		style={{lineHeight: 0}}		
        	>
        	{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
        </div>
    );
};
function TDetail($this) {
	const [modal, setModal] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [Tinfo, setTinfo] = useState({});
	const [activeStage, setActiveStage] = useState({});
	const [prevStage, setPrevStage] = useState({});
	const [nextStage, setNextStage] = useState({});
	const [taskResult, setTaskResult] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
	const [members, setMembers] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [watches, setWatches] = useState([]);
	const [onWatches, setOnWatches] = useState([]);
	const [tags, setTaggs] = useState([]);
	const [onTags, setOnTags] = useState([]);
	const myRefs = useRef([]);
	const [taskTypes, setTaskTypes] = useState([]);
	const [activeType, setActiveType] = useState({});
	const [accessAddTlist, setAccessAddTlist] = useState(false);
	//
	$this.header_self.toggleMTD = (uid) => {
        if (!modal) {
        	setAccessAddTlist(true);
        	setTinfo(prevTinfo => ({...{}, ...{}}));
        	setSelectedOption({});
            setDataSelectDropdown(uid);
        }
        setModal(!modal)
    };
    const toggleWatches = () => {
    	if (!dropdownOpen) {
        	let _watches = _.filter($this.wms_class.comStage.state.lstMembers, function(o) {return o.uid != Tinfo.assign;});
			setWatches(prevwatches => ([...[], ..._watches]));
			let _watch_ids = _.map(Tinfo.watches, 'uid');
			let _onWatches = _.filter($this.wms_class.comStage.state.lstMembers, function(o) {return o.uid != Tinfo.assign && _watch_ids.indexOf(o.uid) > -1;});
			setOnWatches(prevwatches => ([...[], ..._onWatches]));
        }
        setDropdownOpen(!dropdownOpen)
    }
    let setDataSelectDropdown = (uid, changeTag = false) => {
    	let _reset = [];
    	showTinfo(uid, function(data){
        	setMembers($this.wms_class.comStage.state.lstMembers);
			let _assign = _.find($this.wms_class.comStage.state.lstMembers, {uid: data.assign});
			setSelectedOption(_assign);
			let _watches = _.filter($this.wms_class.comStage.state.lstMembers, function(o) {return o.uid != data.assign;});
			setWatches(prevwatches => ([...[], ..._watches]));
			let _watch_ids = _.map(data.watches, 'uid');
			let _onWatches = _.filter($this.wms_class.comStage.state.lstMembers, function(o) {return o.uid != data.assign && _watch_ids.indexOf(o.uid) > -1;});
			setOnWatches(prevwatches => ([...[], ..._onWatches]));
			setTaggs(prevtags => ([...[], ...$this.wms_class.comStage.state.lstTags]));
			let _tag_ids = _.map(data.tags, 'id');
			let _onTags = _.filter($this.wms_class.comStage.state.lstTags, function(o) {return _tag_ids.indexOf(o.id) > -1;});
			setOnTags(prevtags => ([...[], ..._onTags]));
			// update main task
			if (changeTag) {
				let _tasks = $this.wms_class.comStage.state.objData.tasks.map(item => ({...item}));
		    	const _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
		    	_tasks[_findIndex]['tags'] = _tag_ids.length > 0 ? _tag_ids.join(',') : null;
	        	const newState = {
			        ...$this.wms_class.comStage.state,
			        objData: {
			            ...$this.wms_class.comStage.state.objData,
			            tasks: _tasks,
			        }
			    }
			    $this.wms_class.comStage.setState(newState);
			    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
			}
            let _taskTypes = _.filter($this.wms_class.comStage.state.lstConstants, function(o) {return o.mode == 'type';});
            setTaskTypes(prev => ([...[], ..._taskTypes]));
            let _activeType = _.find(_taskTypes, {identifier: data.type});
			setActiveType(_activeType);
			setStartDate(data.duedate ? new Date(data.duedate) : new Date(moment().add(15, 'minutes')));
        });
    }
    let showTinfo = (uid, $callback) => {
    	ServiceTinfo.instance.showTinfo(uid)
        .then(async ({ data }) => {
            setTinfo(prevTinfo => ({...{}, ...data}));
			let activeStages = _.filter($this.wms_class.comStage.state.objData.columns, {status: 'active'});
			let _activeStage = _.find($this.wms_class.comStage.state.objData.columns, {step: data.step});
			setActiveStage(_activeStage);
			let active_index = _.findIndex(activeStages, {step: data.step});
			setPrevStage(active_index > 0 ? activeStages[active_index - 1] : {});
			setNextStage(active_index < activeStages.length - 1 ? activeStages[active_index + 1] : {});
			let taskResult = _.find($this.wms_class.comStage.state.lstConstants, {identifier: data.result});
			setTaskResult(taskResult);
			return $callback(data);
        })
    }
	let handleColor = (time) => {
		return time.getHours() > 12 ? "text-success" : "text-error";
	};
	let changeStage = (stage) => {
		let comStage = $this.wms_class.comStage;
	    let _stages = comStage.state.objData.columns.map(item => ({...item}));
		let prev_task = _.find(comStage.state.objData.tasks, {task_id: stage.taskIds[stage.taskIds.length - 1]});
		let objTask = {step: stage.step, prev_uid: prev_task ? prev_task.uid : false};
    	let _tasks = comStage.state.objData.tasks.map(item => ({...item}));
    	let _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
		if (!['complete', 'failure', 'cancel', 'inprocess'].includes(_tasks[_findIndex]['result'])) {
    		_tasks[_findIndex]['result'] = 'inprocess';
    		objTask.result = 'inprocess';
    	}
		$this.wms_class.updateTinfo(Tinfo.uid, objTask, function(res){
			if (!res.status) {
				Util.toast(res.error, 'error');
				return;
			}
			const start_index = _.findIndex(_stages, {step: Tinfo.step});
		    const finish_index = _.findIndex(_stages, {step: stage.step});
		    const start = _stages[start_index];
		    const finish = _stages[finish_index];
			const startTaskIds = Array.from(start.taskIds);
			const _index = startTaskIds.indexOf(Tinfo.task_id);
		    startTaskIds.splice(_index, 1);
		    _stages[start_index]['taskIds'] = startTaskIds;
		    _stages[start_index]['count'] = _stages[start_index]['count'] - 1;
		    _stages[start_index]['offset'] = _stages[start_index]['offset'] - 1;
		    const finishTaskIds = Array.from(finish.taskIds);
		    finishTaskIds.splice(finishTaskIds.length, 0, Tinfo.task_id);
		    _stages[finish_index]['taskIds'] = finishTaskIds;
		    _stages[finish_index]['count'] = _stages[finish_index]['count'] + 1;
		    _stages[finish_index]['offset'] = _stages[finish_index]['offset'] + 1;
		    showTinfo(Tinfo.uid, function(){
		    	_tasks[_findIndex]['step'] = stage.step;
            	const newState = {
			        ...comStage.state,
			        objData: {
			            ...comStage.state.objData,
			            columns: _stages,
			            tasks: _tasks,
			        }
			    }
			    comStage.setState(newState);
			    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
            });
	    });
	}
	let updateTask = (key, value) => {
		let comStage = $this.wms_class.comStage;
		let dataObj = {};
		dataObj[key] = value;
		$this.wms_class.updateTinfo(Tinfo.uid, dataObj, function(){
		    showTinfo(Tinfo.uid, function(data){
		    	let _tasks = comStage.state.objData.tasks.map(item => ({...item}));
		    	let _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
		    	_tasks[_findIndex][key] = value;
	    		let _stages = comStage.state.objData.columns.map(item => ({...item}));
		    	if (key == 'status' && value == 'deactive') {
					let _index = _.findIndex(_stages, {step: data.step});
				    let _current = _stages[_index];
					let _currentTaskIds = Array.from(_current.taskIds);
					let t_index = _currentTaskIds.indexOf(Tinfo.task_id);
				    _currentTaskIds.splice(t_index, 1);
				    _stages[_index]['taskIds'] = _currentTaskIds;
				    _stages[_index]['count'] = _stages[_index]['count'] - 1;
				    _stages[_index]['offset'] = _stages[_index]['offset'] - 1;
				    _tasks.splice(_findIndex, 1);
				    $this.header_self.toggleMTD(Tinfo.uid);
		    	}
		    	if (key == 'index' && value == 1) {
		    		let _index = _.findIndex(_stages, {step: data.step});
				    let _current = _stages[_index];
					let _currentTaskIds = Array.from(_current.taskIds);
					let t_index = _currentTaskIds.indexOf(Tinfo.task_id);
				    _currentTaskIds.splice(t_index, 1);
				    _currentTaskIds.unshift(Tinfo.task_id);
				    _stages[_index]['taskIds'] = _currentTaskIds;
		    	}
		    	if (key == 'duedate') {
		    		if (!data.duedate) {
		    			delete _tasks[_findIndex]['overdue'];
		    			delete _tasks[_findIndex]['indue'];
		    		} else {
			    		if (moment().isBefore(data.duedate)) {
			    			delete _tasks[_findIndex]['overdue'];
			    			_tasks[_findIndex]['indue'] = Util.formatDateTime(data.duedate, "DD/MM/YY");
			    		} else {
			    			delete _tasks[_findIndex]['indue'];
			    			_tasks[_findIndex]['overdue'] = Util.formatDateTime(data.duedate, "DD/MM/YY");
			    		}
			    	}
		    	}
            	const newState = {
			        ...comStage.state,
			        objData: {
			            ...comStage.state.objData,
			            tasks: _tasks,
			            columns: _stages,
			        }
			    }
			    comStage.setState(newState);
			    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
            });
	    });
	}
	let onSelectedOption = (member) => {
        updateTask('assign', member.uid);
    }
    let duplicateTask = () => {
    	//
    }
    let deleteTask = () => {
    	//
    }
    let onSelectedWatch = (members) => {
    	if (members.length < Tinfo.watches.length) {
    		let diff = _.differenceBy(Tinfo.watches, members, 'uid');
	        ServiceTinfo.instance.removeTmber({workflow_id: $this.wms_class.comStage.state.objData.workfolows.id, task_id: Tinfo.uid, watch_id: diff[0].uid}).then(({ data }) => {
	            if (data.status) {
	            	setDataSelectDropdown(Tinfo.uid);
	            } else {
	            	//
	            }
	        })
    	} else {
    		let diff = _.differenceBy(members, Tinfo.watches, 'uid');
	        ServiceTinfo.instance.assignTmber({workflow_id: $this.wms_class.comStage.state.objData.workfolows.id, task_id: Tinfo.uid, watch_id: diff[0].uid}).then(({ data }) => {
	            if (data.status) {
	            	setDataSelectDropdown(Tinfo.uid);
	            } else {
	            	//
	            }
	        })
    	}
    }
    let onSelectedTag = (tags) => {
    	if (tags.length < Tinfo.tags.length) {
    		let diff = _.differenceBy(Tinfo.tags, tags, 'id');
	        ServiceWtags.instance.removeTtags({workflow_id: $this.wms_class.comStage.state.objData.workfolows.id, task_id: Tinfo.uid, tags: diff[0].id}).then(({ data }) => {
	            if (data.status) {
	            	setDataSelectDropdown(Tinfo.uid, true);
	            } else {
	            	//
	            }
	        })
    	} else {
    		let diff = _.differenceBy(tags, Tinfo.tags, 'id');
	        ServiceWtags.instance.assignTtags({workflow_id: $this.wms_class.comStage.state.objData.workfolows.id, task_id: Tinfo.uid, tags: diff[0].id}).then(({ data }) => {
	            if (data.status) {
	            	setDataSelectDropdown(Tinfo.uid, true);
	            } else {
	            	//
	            }
	        })
    	}
    }
    let outFocusTinfo = (event) => {
        event.preventDefault();
    	const {name, value} = event.target;
        updateTask(name, value);
    }
    let handleAttachFile = (event) => {
    	let files = event.target.files;
    	uploadTfile(files, function(){
    		document.getElementById('file-upload').value = null;
    	});
    }
    let uploadTfile = (files, $callback) => {
    	if (files.length == 0) {
    		return;
    	}
    	ServiceFile.instance.uploadTfile(Tinfo.uid, [files[0]]).then(({ data }) => {
	        if (data.status) {
	        	let _tempFiles = files.map(item => ({...item}));
	        	_tempFiles.splice(0, 1);
	        	let _tinfo = {...Tinfo};
	        	_tinfo.attachments.unshift(data.file);
	        	setTinfo(prevTinfo => ({...{}, ..._tinfo}));
	        	if (_tempFiles.length > 0) {
	        		uploadTfile(_tempFiles, $callback);
	        	} else {
	        		let _tasks = $this.wms_class.comStage.state.objData.tasks.map(item => ({...item}));
			    	const _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
			    	_tasks[_findIndex]['pathfile'] = data.file.path;
			    	_tasks[_findIndex]['attach'] = Tinfo.attachments.length;
		        	const newState = {
				        ...$this.wms_class.comStage.state,
				        objData: {
				            ...$this.wms_class.comStage.state.objData,
				            tasks: _tasks,
				        }
				    }
				    $this.wms_class.comStage.setState(newState);
				    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
				    return $callback();
	        	}
	        } else {
	        	Util.toast(data.error, 'error');
	        	return $callback();
	        }
	    })
    }
    let onDeleteAttach = (tfile_id) => {
    	ServiceFile.instance.deleteTfile(tfile_id).then(({ data }) => {
    		if (data.status) {
	        	let _tinfo = {...Tinfo};
    			let _tempFiles = _tinfo.attachments.map(item => ({...item}));
    			let _indexFile = _.findIndex(_tinfo.attachments, {id: tfile_id});
	        	_tempFiles.splice(_indexFile, 1);
	        	_tinfo.attachments = _tempFiles;
	        	setTinfo(prevTinfo => ({...{}, ..._tinfo}));
	        	let _tasks = $this.wms_class.comStage.state.objData.tasks.map(item => ({...item}));
		    	let _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
		    	_tasks[_findIndex]['pathfile'] = _tempFiles.length > 0 ? _tempFiles[0].path : null;
		    	_tasks[_findIndex]['pathfile'] = _tempFiles.length;
	        	const newState = {
			        ...$this.wms_class.comStage.state,
			        objData: {
			            ...$this.wms_class.comStage.state.objData,
			            tasks: _tasks,
			        }
			    }
			    $this.wms_class.comStage.setState(newState);
			    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
	        } else {
	        	Util.toast(data.error, 'error');
	        }
	    })
    }
    let addChecklist = () => {
    	let _tinfo = {...Tinfo};
    	_tinfo.checklists.push({task_id: Tinfo.uid, mode: 'single', wstage: activeStage.uid, bgrid: activeStage.bgrid, content: ''});
    	setTinfo(prevTinfo => ({...{}, ..._tinfo}));
    	waitingFocus(_tinfo.checklists.length - 1);
    	setAccessAddTlist(!accessAddTlist);
    }
    let waitingFocus = (index) => {
    	if (myRefs.current[index]) {
    		return myRefs.current[index].focus();
    	} else {
    		setTimeout(async function(){
	    		return waitingFocus(index);
	    	}, 200);
    	}
    }
    let setMainTask = () => {
    	let _tasks = $this.wms_class.comStage.state.objData.tasks.map(item => ({...item}));
    	const _findIndex = _.findIndex(_tasks, {uid: Tinfo.uid});
    	_tasks[_findIndex]['checklist'] = Util.renderNumberPlus(Tinfo.review_checklists) + '/' + Util.renderNumberPlus(Tinfo.complete_checklists) + '/' + Util.renderNumberPlus(Tinfo.fail_checklists) + '/' + Util.renderNumberPlus(Tinfo.checklists.length);
    	const newState = {
	        ...$this.wms_class.comStage.state,
	        objData: {
	            ...$this.wms_class.comStage.state.objData,
	            tasks: _tasks,
	        }
	    }
	    $this.wms_class.comStage.setState(newState);
	    $this.wms_class.react.setState({wms_class: $this.wms_class.comStage});
    }
    let onChangeChecklist = (event, i) => {
    	event.preventDefault();
    	const {value} = event.target;
    	let checklists = Tinfo.checklists.map(item => ({...item}));
    	checklists[i].content = value;
    	Tinfo.checklists = checklists;
		setTinfo(prevTinfo => ({...{}, ...Tinfo}));
    }
    let outFocusChecklist = (event, i) => {
        event.preventDefault();
    	const {value} = event.target;
    	let checklists = Tinfo.checklists.map(item => ({...item}));
    	let checklist = {...checklists[i]};
    	checklist.content = value;
    	if (checklist.id) {
    		updateTlist(checklist, i);
    	} else {
    		ServiceTlist.instance.storeTlist(checklist).then(({ data }) => {
	    		if (data.status) {
	    			checklists[i] = data.checklist;
	        		Tinfo.checklists = checklists;
	        		setTinfo(prevTinfo => ({...{}, ...Tinfo}));
	        		setAccessAddTlist(!accessAddTlist);
	        		setMainTask();
		        } else {
		        	Util.toast(data.error, 'error');
		        }
		    })
    	}	
    }
    let updateTlist = (checklist, i) => {
    	let checklists = Tinfo.checklists.map(item => ({...item}));
    	delete checklist.index;
    	ServiceTlist.instance.updateTlist(checklist.id, checklist).then(({ data }) => {
    		if (data.status) {
        		checklists[i] = data.checklist;
        		overWriteTinfo(checklists);
	        } else {
	        	Util.toast(data.error, 'error');
	        }
	    })
    }
    let overWriteTinfo = (checklists) => {
    	Tinfo.checklists = checklists;
		Tinfo.complete_checklists = _.filter(Tinfo.checklists, {result: 'complete'}).length;
		Tinfo.review_checklists = _.filter(Tinfo.checklists, {result: 'review'}).length;
		Tinfo.fail_checklists = _.filter(Tinfo.checklists, {result: 'failure'}).length;
		setTinfo(prevTinfo => ({...{}, ...Tinfo}));
		setMainTask();
    }
    let handleCheck = (event, checklist, i) => {
    	checklist.result = event.target.checked ? 'review' : 'inprocess';
    	updateTlist(checklist, i);
    }
    let completeTlist = (id, i) => {
    	let checklists = Tinfo.checklists.map(item => ({...item}));
    	ServiceTlist.instance.completeTlist(id).then(({ data }) => {
    		if (data.status) {
        		checklists[i].result = 'complete';
        		overWriteTinfo(checklists);
	        } else {
	        	Util.toast(data.error, 'error');
	        }
	    })
    }
    let rejectTlist = (id, i) => {
    	let checklists = Tinfo.checklists.map(item => ({...item}));
    	ServiceTlist.instance.rejectTlist(id).then(({ data }) => {
    		if (data.status) {
        		checklists[i].result = 'failure';
        		checklists.splice(i+1, 0, data.checklist);
        		overWriteTinfo(checklists);
	        } else {
	        	Util.toast(data.error, 'error');
	        }
	    })
    }
    let deleteTlist = (id, i) => {
    	if (!id) {
    		let _tinfo = {...Tinfo};
			_tinfo.checklists.splice(i, 1);
			overWriteTinfo(_tinfo.checklists);
			setAccessAddTlist(!accessAddTlist);
    	} else {
    		ServiceTlist.instance.deleteTlist(id).then(({ data }) => {
	    		if (data.status) {
	        		let _tinfo = {...Tinfo};
	    			_tinfo.checklists.splice(i, 1);
	    			overWriteTinfo(_tinfo.checklists);
		        } else {
		        	Util.toast(data.error, 'error');
		        }
		    })
    	}	
    }
    let changeType = (type) => {
    	setActiveType(prev => ({...{}, ...type}));
    	updateTask('type', type.identifier);
    }
    let setDueDate = (date) => {
    	setStartDate(date);
    	updateTask('duedate', date ? moment(date).format("YYYY-MM-DD HH:mm:ss"): date);
    }
    let onChangeTfield = (event, i) => {
    	event.preventDefault();
    	const {value} = event.target;
    	let custom_fields = Tinfo.custom_fields.map(item => ({...item}));
    	custom_fields[i].value = value;
    	Tinfo.custom_fields = custom_fields;
		setTinfo(prevTinfo => ({...{}, ...Tinfo}));
    }
    let outFocusTfield = (event, i) => {
        event.preventDefault();
    	const {value} = event.target;
    	let custom_fields = Tinfo.custom_fields.map(item => ({...item}));
    	let custom_field = {...custom_fields[i]};
    	custom_field.value = value;
		ServiceTfield.instance.updateTfield(custom_field.id, custom_field).then(({ data }) => {
    		if (data.status) {
        		Tinfo.custom_fields = custom_fields;
        		setTinfo(prevTinfo => ({...{}, ...Tinfo}));
	        } else {
	        	Util.toast(data.error, 'error');
	        }
	    })	
    }
  	return (
		<Modal isOpen={modal} toggle={$this.react.toggleMTD} {...$this} size={`xl`} scrollable={true}
			>
		    <ModalHeader toggle={$this.react.toggleMTD}
		    	className={`modal-maintask`}
		    	tag="div">
                {prevStage && prevStage.step && (<Button
					color="outline-primary"
					className={`py-0 `}
					title="Prev Stage"
					onClick={() => changeStage(prevStage)}
				>
					<MdOutlineKeyboardDoubleArrowLeft size="30" className={`p-1`} />
				</Button>)}
				{nextStage && nextStage.step && (<Button
					color="outline-primary"
					className={`py-0 `}
					title="Next Stage"
					onClick={() => changeStage(nextStage)}
				>
					<MdOutlineKeyboardDoubleArrowRight size="30" className={`p-1`} />
				</Button>)}
				{$this.wms_class && $this.wms_class.comStage && $this.wms_class.comStage.state && $this.wms_class.comStage.state.objData && activeStage && (
				<UncontrolledDropdown>
				    <DropdownToggle color="skip" caret className={`btn d-flex align-items-center text-white h-100`}
				    style={{backgroundColor: activeStage.background}} >
				        {activeStage.name}
				    </DropdownToggle>
				    <DropdownMenu end flip className={`border-0 py-0 mt-2`}>
				    	{$this.wms_class.comStage.state.objData.columns && $this.wms_class.comStage.state.objData.columns.map((stage, i) => { 
                            return stage.step != activeStage.step ? <DropdownItem key={i} className={`d-flex align-items-center hover-opacity-5per text-white`}
                            style={{backgroundColor: stage.background}} onClick={() => changeStage(stage)}>
                            	{stage.name}
                        	</DropdownItem> : ''
                        }
                        )}
				    </DropdownMenu >
				</UncontrolledDropdown>)}
				{Tinfo && Tinfo.result == 'inprocess' && (
					<Button
						color="skip"
						className={`py-0 text-white`}
						onClick={() => updateTask('result', 'complete')}
						style={{backgroundColor: Util.indexColorbyId($this.wms_class.comStage.state.lstColors, taskResult.bgrid)}}
					>
						Complete
					</Button>)}
				{Tinfo && (Tinfo.result == 'complete' || Tinfo.result == 'failure' || Tinfo.result == 'cancel') && (
					<Button
						color="skip"
						className={`py-0 text-white`}
						onClick={() => updateTask('status', 'deactive')}
						style={{backgroundColor: Util.indexColorbyId($this.wms_class.comStage.state.lstColors, taskResult.bgrid)}}
					>
						Archive
					</Button>)}
				{selectedOption && selectedOption.uid && (
				<div
                    className={`bg-light hover-effect-border text-muted px-0 me-auto`}
                    title={'Assign Employee Name'} style={{minWidth: 'var(--pix-w-240)'}}
                >
                	<Select
                		defaultValue={selectedOption}
	                	options={members}
	                	components={{
					        Option: CustomSelectOption,
					        SingleValue: CustomSelectValue
					    }}
					    onChange={onSelectedOption}
					    className={`cuson-selects-value`}
				    />
                </div>)}
                {Tinfo && Tinfo.tags && (
                <UncontrolledDropdown>
			    	<DropdownToggle color="light" className={`d-flex align-items-center hover-effect-none bg-transparent border-0 px-0`}>
			    		<div className={`d-flex align-self-start text-muted`} title={'Tags List'}>
		                    <LiaTagsSolid size="30" className={`bg-light hover-effect-border rounded-circle text-muted p-1`}/>
		                    <h6 style={{fontSize: 'var(--fs-11)'}}>{Util.renderNumberPlus(Tinfo.tags.length)}</h6>
                		</div>
	                </DropdownToggle>
	                <DropdownMenu end flip className={`border-0 py-0`}>
		                <DropdownItem className={`d-flex align-items-center hover-effect-border p-0`} toggle={false}>
				            <div className={`bg-light hover-effect-border text-muted px-0`}
			                    title={'Tags List'} style={{minWidth: 'var(--pix-w-240)'}}>
			                	<Select
			                		isMulti
			                		defaultValue={onTags}
				                	options={tags}
								    onChange={onSelectedTag}
								    isClearable={false}
								    styles={colourStyles}
								    className={`cuson-tags-value`}
							    />
			                </div>
				        </DropdownItem>
				    </DropdownMenu >
	            </UncontrolledDropdown>
                )}
				{Tinfo && Tinfo.watches && (
				<Dropdown isOpen={dropdownOpen} toggle={toggleWatches}>
			    	<DropdownToggle color="light" className={`d-flex align-items-center hover-effect-none bg-transparent border-0 px-0`}>
					    <div className={`d-flex align-self-start text-muted`} title={'Watch List'} >
		                    <MdOutlineVisibility size="30" className={`bg-light hover-effect-border rounded-circle text-muted p-1`}/>
		                    <h6 style={{fontSize: 'var(--fs-11)'}}>{Util.renderNumberPlus(Tinfo.watches.length)}</h6>
	                	</div>
	                </DropdownToggle>
	                <DropdownMenu end flip className={`border-0 py-0`}>
		                <DropdownItem className={`d-flex align-items-center hover-effect-border p-0`} toggle={false}>
				            <div className={`bg-light hover-effect-border text-muted px-0`}
			                    title={'Watch List'} style={{minWidth: 'var(--pix-w-320)'}}>
			                	<Select
			                		isMulti
			                		defaultValue={onWatches}
				                	options={watches}
				                	components={{
								        Option: CustomSelectOption,
								        MultiValueLabel: CustomSelectValue
								    }}
								    onChange={onSelectedWatch}
								    isClearable={false}
								    className={`cuson-tags-value`}
							    />
			                </div>
				        </DropdownItem>
				    </DropdownMenu >
	            </Dropdown>
            	)}
            	<div className="d-flex align-items-center hover-effect-none bg-transparent border-0 btn btn-light p-0">
            		<MdOutlinePushPin size="30" className={`bg-light hover-effect-border rounded-circle text-muted p-1`} title={'Pin Top'} onClick={() => updateTask('index', 1)}/>
            	</div>				
				<UncontrolledDropdown>
				    <DropdownToggle color="light" className={`d-flex align-items-center hover-effect-none bg-transparent border-0 px-0`}>
				        <MdOutlineMoreHoriz size="30" className={`bg-light hover-effect-border rounded-circle text-muted p-1`} title={'More...'}/>
				    </DropdownToggle>
				    <DropdownMenu end flip className={`border-0`}>
				        <DropdownItem  header>
				            Manage Job
				        </DropdownItem >
				        <DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => duplicateTask()}>
				            <PiCopySimpleBold className={`me-1`} /> Duplicate
				        </DropdownItem>
				        {Tinfo && Tinfo.status == 'active' && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('status', 'deactive')}>
				            <PiArchiveDuotone className={`me-1`} /> Archive
				        </DropdownItem>)}
				        {Tinfo && Tinfo.status == 'deactive' && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('status', 'active')}>
				            <MdSettingsBackupRestore className={`me-1`} /> Restore
				        </DropdownItem>)}
				        <DropdownItem  divider>
		        		</DropdownItem >
				        {Tinfo && Tinfo.status == 'active' && Tinfo.result != 'complete' && Tinfo.result != 'failure' && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('result', 'complete')}>
				            <MdDoneAll className={`me-1`} /> Complete
				        </DropdownItem>)}
				        {Tinfo && Tinfo.status == 'active' && Tinfo.result != 'failure' && Tinfo.result != 'complete' && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('result', 'failure')}>
				            <MdRunningWithErrors className={`me-1`} /> Failure
				        </DropdownItem>)}
				        {Tinfo && Tinfo.status == 'active' && Tinfo.result != 'cancel' && Tinfo.result != 'complete' && Tinfo.result != 'failure' && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('result', 'cancel')}>
				            <MdOutlineFreeCancellation className={`me-1`} /> Cancel
				        </DropdownItem>)}
				        {Tinfo && Tinfo.status != 'deactive' && (Tinfo.result == 'complete' || Tinfo.result == 'failure' || Tinfo.result == 'cancel') && (
			        	<DropdownItem className={`d-flex align-items-center hover-effect-border`} onClick={() => updateTask('result', 'inprocess')}>
				            <PiVinylRecordBold className={`me-1`} /> Redo
				        </DropdownItem>)}
				        <DropdownItem divider>
				        </DropdownItem>
				        <DropdownItem className={`text-danger text-center hover-effect-border`} onClick={() => deleteTask()}>
				            Delete Task
				        </DropdownItem>
				    </DropdownMenu >
				</UncontrolledDropdown>
		    </ModalHeader>
		    <ModalBody
		    	className={`modal-maintask d-flex gap-3 mb-0`}>
			    <div
                    className={`maintask-left h-100`}
                    style={{width: 'var(--per-wi-66)'}}
                >
                	<Input
                		name="name"
                		style={{cursor: 'inherit'}}
                		className={`border-0 hover-effect-border fs-5 py-0 bg-light`}
                		defaultValue={Tinfo.name}
                        onBlur={(event) => outFocusTinfo(event)}
                		placeholder="Title & Name"
                		disabled={Tinfo.mode == 'link'}
  					/>
  					<Input
  						name="content"
                		style={{cursor: 'inherit'}}
                		className={`border-0 hover-effect-border fs-6 mt-1 py-0 bg-light text-black-50`}
                		defaultValue={Tinfo.content}
                		onBlur={(event) => outFocusTinfo(event)}
                		placeholder="Content"
                		disabled={Tinfo.mode == 'link'}
  					/>
  					<TextareaAutosize 
  						name="described"
  						style={{cursor: 'inherit'}}
  						className={`form-control border-1 hover-effect-border w-100 mt-1 text-muted bg-white`}
  					 	defaultValue={Tinfo.described} 
  					 	onBlur={(event) => outFocusTinfo(event)}
  					 	placeholder="Described"
  					/>
  					{/*attachment-task*/}
  					<Card  className={`border-0 rounded-0 mt-3 attachment-task`}
                        >
                        <CardHeader
                            className={`border-0 rounded-0 fs-6 d-flex justify-content-start py-1 text-primary gap-1`}
                        >
                            <div className={`me-auto d-flex align-self-center`}>Attachments ({Util.renderNumberPlus(Tinfo.attachments ? Tinfo.attachments.length : 0)})</div>
                        	<MdOutlineMoreHoriz size="27" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} title={'More...'}/>
                        	<label htmlFor="file-upload" className="file-upload">
                    			<div className="fileUploadButton">
                      				<MdOutlineCloudUpload size="27" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} title={'Upload'}/>
                      				<Input type="file" multiple style={{display: 'none'}} id="file-upload" onChange={(event) => handleAttachFile(event)} />
                    			</div>
                  			</label>
                        </CardHeader>
                        <CardBody
                            className={`px-1 py-1`}
                        >
                            <LightgalleryProvider
				                lightgallerySettings={
				                    {
				                        // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
				                        addClass: 'bg-dark'
				                    }
				                }
				                galleryClassName="my_custom_classname"
				            >
				                <div className={`d-flex gap-1 justify-content-start`}>
									{Tinfo.attachments && Tinfo.attachments.map((p, idx) => (
										<div key={idx} style={{ maxWidth: 'var(--pix-wi-250)', minHeight: 'var(--pix-hi-150)', width: 'var(--pix-wi-200)', cursor: 'pointer'}} 
										className={`position-relative d-flex justify-content-center align-self-center ${idx > 4  ? 'd-none' : ''}`}>
											<MdOutlineDeleteSweep size="27" onClick={() => onDeleteAttach(p.id)}
												style={{ zIndex: 1000}}
												className={`bg-light opacity-25 rounded-circle p-1 text-danger position-absolute end-0 hover-opacity-unset`} title={'Delete Attached'}/>
											<div style={{ maxHeight: 'var(--pix-hi-180)', maxWidth: 'var(--pix-wi-250)', cursor: 'pointer'}} className={`hover-opacity-5per`}>
												<LightgalleryItem group={"group_n"} src={p.path} thumb={p.path}>
												  	<img src={p.path} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
												</LightgalleryItem>
											</div>
										</div>
									))}
					            </div>
				            </LightgalleryProvider>
                        </CardBody>
                    </Card>
					{/*checklist-task*/}
                    <Card  className={`border-0 rounded-0 mt-0 checklist-task`}
                        >
                        <CardHeader
                            className={`border-0 rounded-0 fs-6 d-flex justify-content-start py-1 text-primary gap-1`}
                        >
                            <div className={`me-auto d-flex align-self-center`}>Checklist ({Util.renderNumberPlus(Tinfo.review_checklists ? Tinfo.review_checklists : 0)}/{Util.renderNumberPlus(Tinfo.complete_checklists ? Tinfo.complete_checklists : 0)}/{Util.renderNumberPlus(Tinfo.fail_checklists ? Tinfo.fail_checklists : 0)}/{Util.renderNumberPlus(Tinfo.checklists ? Tinfo.checklists.length : 0)})</div>
                        	<MdOutlineMoreHoriz size="27" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} title={'More...'}/>
                        	{accessAddTlist && (<MdOutlineAdd size="27" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} onClick={() => addChecklist()} title={'Add Checklist'}/>)}
                        </CardHeader>
                        <ListGroup>
                        	{Tinfo.checklists && Tinfo.checklists.map((checklist, i) => (
								<InputGroup key={i} className={`px-3 gap-3 align-items-center item-do-list hover-effect`}
							    	style={{cursor: 'initial'}}
							    >
							    	{checklist.result != 'failure' && (
						    		<label className={`align-self-start checkcontainer my-1`} style={{cursor: 'pointer'}}>
										<Input onChange={(event) => handleCheck(event, checklist, i)}
											addon
											aria-label="Check Completed"
											type="checkbox"
											checked={checklist.result == 'review' || checklist.result == 'complete'}
											disabled={checklist.result == 'complete' || checklist.result == 'failure'}
										/>
									  	<InputGroupText className="checkmark mt-1"></InputGroupText>
									</label>
									)}
									{checklist.result == 'failure' && //
									(
										<label className={`align-self-start rounded-circle bg-danger my-1 mt-2`} style={{cursor: 'pointer'}}>
											<MdOutlineDoDisturbAlt size="24" className={`text-white`} title={'Decline'} style={{cursor: 'pointer'}} />
										</label>
									)}
								    <TextareaAutosize 
								    	style={{lineHeight: `27px`, fontSize: 'var(--fs-15)', //
								    		color: Util.indexColorbyId($this.wms_class.comStage.state.lstColors, checklist.bgrid)}}
				  						className={`form-control border-0 me-auto text-skip hover-child bg-white overflow-hidden //
				  							${checklist.result == 'complete' || checklist.result == 'failure' ? 'text-decoration-line-through' : ''}`}
				  					 	value={checklist.content}
				  					 	onChange={(event) => onChangeChecklist(event, i)}
				  					 	placeholder="Content Description"
				  					 	ref={(el) => (myRefs.current[i] = el)}
				  					 	onBlur={(event) => outFocusChecklist(event, i)}
				  					 	disabled={checklist.mode == 'template' || checklist.result == 'review'}
				  					 	spellCheck={false}
				  					/>
								    {checklist.result == 'review' && (<MdOutlineDone size="24" className={`bg-light rounded-circle p-1 text-muted`} title={'Approve'} style={{cursor: 'pointer'}} onClick={() => completeTlist(checklist.id, i)} />)}
								    {checklist.result == 'review' && (<MdOutlineDoDisturbAlt size="24" className={`bg-light rounded-circle p-1 text-muted`} title={'Decline'} style={{cursor: 'pointer'}} onClick={() => rejectTlist(checklist.id, i)} />)}
								    {checklist.result != 'review' && checklist.result != 'failure' && checklist.result != 'complete' && (<MdOutlineClear size="24" className={`bg-light rounded-circle p-1 text-muted`} title={'Delete'} style={{cursor: 'pointer'}} onClick={() => deleteTlist(checklist.id, i)} />)}
							  	</InputGroup>
							))}
					 	</ListGroup>
                    </Card>
                	{/*conversation-task*/}
                	<Card  className={`border-0 rounded-0 pt-3 conversation-task`}
                        >
                        <CardHeader
                            className={`border-0 rounded-0 fs-6 d-flex justify-content-start py-1 text-primary gap-1`}
                        >
                            <div className={`me-auto d-flex align-self-center`}>Activity</div>
                            <div className={`d-flex align-self-center`}>
                            	<Button
	                        		className={`border-0 py-0 fw-bold`}
								    color="secondary" size="sm" outline>
								    Show all
								 </Button>
								 <Button
	                        		className={`border-0 py-0 fw-bold active`}
								    color="secondary" size="sm" outline>
								    Comments
								 </Button>
								 <Button
	                        		className={`border-0 py-0 fw-bold`}
								    color="secondary" size="sm" outline>
								    Work log
								 </Button>
								 <Button
	                        		className={`border-0 py-0 fw-bold`}
								    color="secondary" size="sm" outline>
								    Track time
								 </Button>
                            </div>
                        </CardHeader>
                        <CardBody className={`d-flex gap-3`}>
                        	<div
			                    className={`d-flex align-items-start text-muted px-0`}
			                >
			                    <FcBusinessman size="32" className={`bg-light border rounded-circle text-muted p-0`}/>
			                </div>
						    <TextareaAutosize 
						    	style={{fontSize: 'var(--fs-15)'}}
		  						className={`w-100 form-control`}
		  					 	placeholder="Add a comment..."
		  					/>
                        </CardBody>
                        <ListGroup className={`mt-3 p-3`}>
						    <InputGroup className={``}
						    	style={{}}
						    >
						    	<div
				                    className={`d-flex align-items-start justify-content-start gap-3 text-black-50 w-100`}
				                >
				                    <FcBusinesswoman size="32" className={`bg-light border rounded-circle text-black-50 p-0`}/>
				                    <span style={{fontSize: 'var(--fs-13)'}} className={`d-flex align-self-start fw-bold`}>Nguyen Thi ABC</span>
				                    <span style={{fontSize: 'var(--fs-13)'}} className={`d-flex align-self-start me-auto`}>3 days ago</span>
				                    <div className={`d-flex align-self-start gap-1`}>
				                    	<Button
		                        			className={`border-0 py-0 bg-light hover-effect text-muted`}
										    color="white" size="sm" outline>
										    Reply
									 	</Button>
									 	<Button
			                        		className={`border-0 py-0 bg-light hover-effect text-muted`}
										    color="white" size="sm" outline>
										    Edit
									 	</Button>
									 	<Button
			                        		className={`border-0 py-0 bg-light hover-effect text-muted`}
										    color="white" size="sm" outline>
										    Delete
									 	</Button>
									 	<MdOutlineAddReaction size="24" className={`bg-light hover-effect rounded-circle p-1 text-muted`} title={'Reaction'} style={{cursor: 'pointer'}}/>
				                    </div>
			                	</div>
			                	<div className={`ps-3 ms-3`}>
			                		<div className={`bg-light ms-3 px-1 py-1`} style={{marginTop: -5}}>
			                			<CardText className={`ms-2 m-0 text-muted`}>
				                			<span style={{background: 'var(--bs-gray-200)'}} className={'px-1'}>@A Nguyen</span>&nbsp;
								          	- xoá hết notify từ cuối 2022 trở về trước cùng quyền supper root là xoá hết: sản xuất, center
		 										- xoá hết notify từ cuối 2022 trở về trước cùng quyền supper root là xoá hết: sản xuất, center
								        </CardText>
								        <div className={`mt-2`}>
								        	<CardText className={`ms-2 m-0 text-muted`}>
					                			<span style={{background: 'var(--bs-gray-200)'}} className={'px-1'}>@A Nguyen</span>&nbsp; said
									        </CardText>
								        	<CardText className={`ms-2 ps-2 m-0 mt-1 text-black-50 small card-text border border-start-1 border-end-0 border-top-0 border-bottom-0 border-primary`}>
					                			<span style={{background: 'var(--bs-gray-200)'}} className={'px-1'}>@A Nguyen</span>&nbsp;
									          	- xoá hết notify từ cuối 2022 trở về trước cùng quyền supper root là xoá hết: sản xuất, center
			 										- xoá hết notify từ cuối 2022 trở về trước cùng quyền supper root là xoá hết: sản xuất, center
									        </CardText>
								        </div>
			                		</div>
							    </div>
							    <div className={`ps-3 ms-3 mt-1`}>
							    	<div className={`ms-3 px-0 py-0 d-flex gap-1`}>
							    		<div
						                    className={`d-flex align-items-center text-primary me-auto px-1 py-0 rounded-5 border border-primary`}
						                    title={'React on this'}
						                    style={{background: 'var(--bs-info-bg-subtle)', cursor: 'pointer'}}
						                >
						                    <FaRegFaceSmile size="24" className={`text-primary rounded-circle p-1`} style={{background: 'var(--bs-info-bg-subtle)'}}/>
						                    <span className={`d-flex align-self-center me-1`} style={{fontSize: 'var(--fs-11)'}}>11</span>
						                </div>
			                			<div
						                    className={`d-flex align-items-center text-primary me-auto px-1 py-0 rounded-5 border border-primary`}
						                    title={'React on this'}
						                    style={{background: 'var(--bs-info-bg-subtle)', cursor: 'pointer'}}
						                >
						                    <FcLike size="24" className={`rounded-circle p-1`} style={{background: 'var(--bs-info-bg-subtle)'}}/>
						                    <span className={`d-flex align-self-center me-1`} style={{fontSize: 'var(--fs-11)'}}>11</span>
						                </div>
						                <div
						                    className={`d-flex align-items-center text-primary me-auto px-1 py-0 rounded-5 border border-primary`}
						                    title={'React on this'}
						                    style={{background: 'var(--bs-info-bg-subtle)', cursor: 'pointer'}}
						                >
						                    <FcCheckmark size="24" className={`rounded-circle p-1`} style={{background: 'var(--bs-info-bg-subtle)'}}/>
						                    <span className={`d-flex align-self-center me-1`} style={{fontSize: 'var(--fs-11)'}}>11</span>
						                </div>
						                <div
						                    className={`d-flex align-items-center text-primary me-auto px-1 py-0 rounded-5 border border-primary`}
						                    title={'React on this'}
						                    style={{background: 'var(--bs-info-bg-subtle)', cursor: 'pointer'}}
						                >
						                    <FcCloseUpMode size="24" className={`rounded-circle p-1`} style={{background: 'var(--bs-info-bg-subtle)'}}/>
						                    <span className={`d-flex align-self-center me-1`} style={{fontSize: 'var(--fs-11)'}}>11</span>
						                </div>
						                <div
						                    className={`d-flex align-items-center text-primary me-auto px-1 py-0 rounded-5 border border-primary`}
						                    title={'React on this'}
						                    style={{background: 'var(--bs-info-bg-subtle)', cursor: 'pointer'}}
						                >
						                    <FaRegFaceSurprise size="24" className={`text-primary rounded-circle p-1`} style={{background: 'var(--bs-info-bg-subtle)'}}/>
						                    <span className={`d-flex align-self-center me-1`} style={{fontSize: 'var(--fs-11)'}}>11</span>
						                </div>
			                		</div>
							    </div>
						  	</InputGroup>
					 	</ListGroup>
                    </Card>
                </div>
			    <div
                    className={`maintask-right bg-light h-100`}
                    style={{width: 'var(--per-wi-34)', background: 'var(--bs-gray-100)'}}>
                    <Card  className={`border-0 rounded-0 bg-transparent`}
                        >
                        {/*<CardHeader
                            className={`border-0 rounded-0 p-2 bg-transparent`}
                        >
                            <CardTitle tag="a" href="#" className={`w-100 d-block h5 text-muted text-decoration-none`}>
						    	Quy trinh quan ly mau in theu
						    </CardTitle>
						    <CardSubtitle
						      className={`w-100 d-block fst-italic h6 text-black-50 text-decoration-none`}
						      href="#"
						      tag="a"
						    >
						      Giai Doan Xu Ly Mau
						    </CardSubtitle>
                        </CardHeader>*/}
                        <CardBody
                            className={`px-2 py-0 bg-transparent action-task-detail d-flex grap-1`}
                        >
                        	{taskTypes && activeType && (
							<UncontrolledDropdown>
							    <DropdownToggle caret className={`btn btn-info btn-sm outline-info d-flex align-items-center text-white`}>
							        {activeType.name}
							    </DropdownToggle>
							    <DropdownMenu end flip className={`border-1`}>
							    	{taskTypes && taskTypes.map((type, i) => { 
			                            return type.identifier != activeType.identifier ? <DropdownItem key={i} className={`d-flex align-items-center hover-effect-border small`}
			                            onClick={() => changeType(type)}>
			                            	{type.name}
			                        	</DropdownItem> : ''
			                        }
			                        )}
							    </DropdownMenu >
							</UncontrolledDropdown>)}
			                {Tinfo.uid && (
			                	<TrackingTime module={'task'} task_id={Tinfo.uid} task_time={Util.calulateTime(Tinfo.task_time)[0]} isRunning={Util.calulateTime(Tinfo.task_time)[1]} wms_class={$this.wms_class} />
		                	)}
			                <div
			                    className={`btn btn-primary btn-sm outline-primary d-flex align-self-center px-0 py-0`}
			                    title={'Due Date'}
			                    style={{cursor: 'pointer'}}
			                >
			                    <MdOutlineCalendarMonth size="28" className={`bg-primary p-1`}/>
			                    <DatePicker
									selected={startDate}
									onChange={(date) => setDueDate(date)}
									minDate={new Date()}
									// timeInputLabel="Time:"
									dateFormat="MM/dd/yyyy h:mm aa"
									// showTimeInput
									className={`input-datepicker form-control py-1 border-0`}
									calendarClassName={`rasta-stripes`}
									// dayClassName={(date) =>
									// 	getDate(date) < Math.random() * 31 ? "random" : undefined
									// }
									timeClassName={handleColor}
									showTimeSelect
									isClearable
									title={'Due Date'}
							    />
			                </div>
                        </CardBody>
                    </Card>
				    {Tinfo.mode && (
			    	<UncontrolledAccordion defaultOpen={Tinfo.mode == 'link' ? 'accordion_custom_1' : 'accordion_custom_2'} className={`border-0 mt-2 px-0`}>
					    {Tinfo.mode == 'link' && (
			    		<AccordionItem className={`border-0`}>
					        <AccordionHeader targetId="accordion_custom_1" className={`py-1 bg-light`}>
					            Infor Detail
					        </AccordionHeader>
					        <AccordionBody accordionId="accordion_custom_1">
					        {Tinfo.wflow_fields && Tinfo.wflow_fields.map((field, i) => (
					        	<FormGroup key={i}>
					        		<Label>
					        			{field.name}
				        			</Label>
				        			<Input name="value" defaultValue={field.value} type="text" disabled={true} />
			        			</FormGroup>
							))}
					        </AccordionBody>
					    </AccordionItem>
						)}
					    <AccordionItem className={`border-0`}>
					        <AccordionHeader targetId="accordion_custom_2" className={`py-1 bg-light`}>
					            Custom Field
					        </AccordionHeader>
					        <AccordionBody accordionId="accordion_custom_2">
				            {Tinfo.custom_fields && Tinfo.custom_fields.map((field, i) => (
					        	<FormGroup key={i}>
					        		<Label>
					        			{field.name}
				        			</Label>
				        			<Input name="value" value={field.value} type="text" onChange={(e) => onChangeTfield(e, i)} onBlur={(e) => outFocusTfield(e, i)} />
			        			</FormGroup>
							))}
					        </AccordionBody>
					    </AccordionItem>
					    <AccordionItem className={`border-0`}>
					        <AccordionHeader targetId="accordion_custom_3" className={`py-1 bg-light`}>
					            Stick Node
					        </AccordionHeader>
					        <AccordionBody accordionId="accordion_custom_3">
					            <strong>
					                This is the second item's accordion body.
					            </strong>
					            You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
					            <code>
					                .accordion-body
					            </code>
					            , though the transition does limit overflow.
					        </AccordionBody>
					    </AccordionItem>
					</UncontrolledAccordion>
					)}
                </div>
		    </ModalBody>
		</Modal>
  );
};
export {TDetail, TrackingTime};