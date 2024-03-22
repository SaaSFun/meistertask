// import npm packge
import _ from 'lodash';
import {ObjectData, ListIcons, ListColors, ListTags, ListWinfos, ListMembers} from "../core/wmsData";
// import service api
import ServiceConfig  from '../services/ServiceConfig';
import ServiceAuth  from '../services/ServiceAuth';
import ServiceUser  from '../services/ServiceUser';
import ServiceWinfo  from '../services/ServiceWinfo';
import ServiceSinfo  from '../services/ServiceSinfo';
import ServiceTinfo  from '../services/ServiceTinfo';
import ServiceWtags  from '../services/ServiceWtags';
// import core class
import Util from '../core/util';
// import com page
//
// import modal tool
//
// import style media
//
// coding
export default function wmsCls() {
	this.initial = async function($react) {
		this.react = $react;
		this.react.state = {
			//
		};
		this.objData = ObjectData;
		this.lstIcons = ListIcons;
		this.lstColors = ListColors;
		this.lstConstants = [];
		this.lstTags = ListTags;
		this.lstWinfos = ListWinfos;
		this.lstMembers = ListMembers;
		this.rightFilterShowing = false;
		this.comStage = null;
		await this;
	};
	this.renderWidth = function($r_show){
		let _self = this;
		_self.rightFilterShowing = !$r_show;
		_self.comStage.setState({rightFilterShowing: !$r_show});
	};
	this.checkLogin = function($callback){
		let _self = this;
		ServiceAuth.instance.checklogin().then(async ({ data }) => {
	        if (data.status) {
	        	_self.objData.profiles.uid = data.member.uid;
	            _self.objData.profiles.fullname = data.member.fullname;
	            _self.objData.profiles.email = data.member.username;
	            _self.objData.profiles.avatar = data.member.avatar;
	            _self.objData.profiles.language = (data.lang).toUpperCase();
	            let onTracking = Util.calulateTime(data.tracking);
	            _self.objData.tasktime = onTracking[0];
	            _self.objData.isRunning = onTracking[1];
	            _self.objData.task_id = data.task_id;
	            _self.objData.workspace = data.workspace;
	            const profileStage = {
			        ..._self.comStage.state,
			        isLogin: true,
			        objData: {
			            ..._self.comStage.state.objData,
			            profiles: {
			                	fullname: data.member.fullname,
						        // shortname: 'CN',
						        avatar: data.member.avatar,
						        email: data.member.username,
						        // role: 'Administrator',
						        language: (data.lang).toUpperCase()
			            },
			            tasktime: onTracking[0],
			            isRunning: onTracking[1],
			            task_id: data.task_id,
			            workspace: data.workspace
			        }
			    }
			    _self.comStage.setState(profileStage);
			    return $callback(_self.comStage);
	        } else {
	            return $callback(false, _self.comStage);
	        }
	    })
	    .catch((e) => {
	    	_self.comStage.setState({isLogin: false});
	        return $callback(false, _self.comStage);
	    });
	};
	this.getLstColors = function() {
		let _self = this;
        ServiceConfig.instance.listColor().then(({ data }) => {
            if (data.status) {
            	_self.lstColors = data.data
            	const colorStage = {
			        ..._self.comStage.state,
			        lstColors: data.data
			    }
			    _self.comStage.setState(colorStage);
            } else {
                Util.toast(data.error, 'error');
            }
        })
    };
    this.getLstIcons = function() {
    	let _self = this;
        ServiceConfig.instance.listIconByCate().then(({ data }) => {
            if (data.status) {
            	_self.lstIcons = data.data
                const iconStage = {
			        ..._self.comStage.state,
			        lstIcons: data.data
			    }
			    _self.comStage.setState(iconStage);
            } else {
                Util.toast(data.error, 'error');
            }
        })
    };
    this.getLstTags = function($activeWmsId, $callback) {
    	let _self = this;
        ServiceWtags.instance.pagingWtags({wflow_id: $activeWmsId}).then(({ data }) => {
            if (data.status) {
            	_self.lstTags = data.data
                const tagStage = {
			        ..._self.comStage.state,
			        lstTags: data.data
			    }
			    _self.comStage.setState(tagStage);
			    return $callback(_self.comStage, data);
            } else {
                return $callback(false, data);
            }
        })
    };
    this.getWconfigs = function() {
    	let _self = this;
        ServiceConfig.instance.wconstants().then(({ data }) => {
        	_self.lstConstants = data;
            const constantStage = {
		        ..._self.comStage.state,
		        lstConstants: data
		    }
		    _self.comStage.setState(constantStage);
        })
    };
    this.getLstWinfos = function($callback) {
    	let _self = this;
	    ServiceWinfo.instance.pagingWinfo({}).then(({data}) => {
            if (data.status) {
                let winfo = data.data[0];
                _self.lstWinfos = data.data
                _self.objData.workfolows.id = winfo.id;
	            _self.objData.workfolows.name = winfo.name;
                const winfoStage = {
			        ..._self.comStage.state,
			        lstWinfos: data.data,
			        objData: {
			            ..._self.comStage.state.objData,
			            workfolows: {
			                	id: winfo.id,
						        name: winfo.name
			            }
			        }
			    }
			    // _self.getLstMembers(winfo.id);
			    _self.comStage.setState(winfoStage);
			    return $callback(_self.comStage);
            } else {
                return $callback(false, data.error);
            }
        })
	};
	this.getLstMembers = function($activeWmsId, $callback) {
		let _self = this;
        ServiceUser.instance.pagingUser({wflow_id: $activeWmsId}).then(({ data }) => {
            if (data.status) {
                _self.lstMembers = _.reject(data.data, function(items) {
                    return !items.isMember;
                });
                const memberStage = {
			        ..._self.comStage.state,
			        lstMembers: data.data
			    }
			    _self.comStage.setState(memberStage);
			    return $callback(_self.comStage);
            } else {
                return $callback(false, data.error);
            }
        })
    };
	this.onDragEnd = $result => {
		let _self = this;
	    const {
	        destination,
	        source,
	        draggableId
	    } = $result;
	    if (!destination) {
	        return
	    }
	    if (destination.droppableId === source.droppableId &&
	        destination.index === source.index) {
	        return;
	    }
	    let holdcolumn = _self.comStage.state.objData.columns.map(item => ({...item}));
        const uid = parseInt(draggableId.replace(/task-/g, ''));
	    const start_index = _.findIndex(_self.comStage.state.objData.columns, {step: source.droppableId});
	    const finish_index = _.findIndex(_self.comStage.state.objData.columns, {step: destination.droppableId});
	    const start = _self.comStage.state.objData.columns[start_index];
	    const finish = _self.comStage.state.objData.columns[finish_index];
	    if (start.step === finish.step) {
	        const newTaskIds = Array.from(start.taskIds);
	        newTaskIds.splice(source.index, 1);
	        newTaskIds.splice(destination.index, 0, draggableId);
	        let prev_task = _.find(_self.comStage.state.objData.tasks, {task_id: destination.index > 0 ? newTaskIds[destination.index - 1] : false});
	        _self.comStage.state.objData.columns[start_index]['taskIds'] = newTaskIds;
	        const newState = {
	            ..._self.comStage.state,
	            objData: {
	                ..._self.comStage.state.objData,
	                columns: _self.comStage.state.objData.columns
	            }
	        }
	        _self.comStage.setState(newState);
		    _self.updateTinfo(uid, {prev_uid: prev_task ? prev_task.uid : false}, function(res){
		    	if (!res.status) {
					Util.toast(res.error, 'error');
					const newState = {
				        ..._self.comStage.state,
				        objData: {
				            ..._self.comStage.state.objData,
				            columns: holdcolumn
				        }
				    }
				    _self.comStage.setState(newState);
					return;
				}
		    });
	        return;
	    }
	    let holdtask = _self.comStage.state.objData.tasks.map(item => ({...item}));
	    const startTaskIds = Array.from(start.taskIds);
	    startTaskIds.splice(source.index, 1);
	    _self.comStage.state.objData.columns[start_index]['taskIds'] = startTaskIds;
	    _self.comStage.state.objData.columns[start_index]['count'] = _self.comStage.state.objData.columns[start_index]['count'] - 1;
	    _self.comStage.state.objData.columns[start_index]['offset'] = _self.comStage.state.objData.columns[start_index]['offset'] - 1; 
	    const finishTaskIds = Array.from(finish.taskIds);
	    finishTaskIds.splice(destination.index, 0, draggableId);
	    let prev_task = _.find(_self.comStage.state.objData.tasks, {task_id: destination.index > 0 ? finishTaskIds[destination.index - 1] : false});
    	let objTask = {step: finish.step, prev_uid: prev_task ? prev_task.uid : false};
	    let _tasks = _self.comStage.state.objData.tasks.map(item => ({...item}));
    	let _findIndex = _.findIndex(_tasks, {uid: parseInt(uid)});
    	if (!['complete', 'failure', 'cancel', 'inprocess'].includes(_tasks[_findIndex]['result'])) {
    		_tasks[_findIndex]['result'] = 'inprocess';
    		objTask.result = 'inprocess';
    	}
	    _self.comStage.state.objData.columns[finish_index]['taskIds'] = finishTaskIds;
	    _self.comStage.state.objData.columns[finish_index]['count'] = _self.comStage.state.objData.columns[finish_index]['count'] + 1;
	    _self.comStage.state.objData.columns[finish_index]['offset'] = _self.comStage.state.objData.columns[finish_index]['offset'] + 1;
	    const newState = {
	        ..._self.comStage.state,
	        objData: {
	            ..._self.comStage.state.objData,
	            columns: _self.comStage.state.objData.columns,
	            tasks: _tasks
	        }
	    }
	    _self.comStage.setState(newState);
	    _self.updateTinfo(uid, objTask, function(res){
	    	if (!res.status) {
				Util.toast(res.error, 'error');
				const newState = {
			        ..._self.comStage.state,
			        objData: {
			            ..._self.comStage.state.objData,
			            columns: holdcolumn,
			            tasks: holdtask
			        }
			    }
			    _self.comStage.setState(newState);
				return;
			}
		    if (startTaskIds.length > 0) {
		    	let _current = _.find(_self.comStage.state.objData.tasks, {task_id: startTaskIds[0]});
		    	_self.updateTinfo(_current.uid, {prev_uid: false}, function(res){
			    	//
			    });
		    } 
	    });
	};
	this.updateTinfo = function(uid, tinfo, $callback){
		ServiceTinfo.instance.updateTinfo(uid, tinfo).then(({ data }) => {
            return $callback(data);
        })
	}
	this.getLstStages = function($activeWmsId, $callback) {
		let _self = this;
        ServiceSinfo.instance.pagingSinfo({wflow_id: $activeWmsId}).then(({ data }) => {
            if (data.status) {
                const stages = data.data;
                _self.recurStages($activeWmsId, stages, 0, function($arg){
                	if($arg){
                		return $callback(_self.comStage);
                	}
                	else {
                		return $callback(false, "data.error");
                	}
                });
            } else {
                return $callback(false, data.error);
            }
        })
	};
	this.recurStages = function($activeWmsId, $lstStage, $onIndex = 0, $callback){
		let _self = this;
		if ($lstStage.length > 0 && $onIndex >= 0){
			const $onStage = $lstStage[$onIndex];
			const $request = _self.getLstTasks($activeWmsId, $onStage.step, 10, 0, function($comStage, $data){
	    		if ($comStage) {
	            	$onStage.rows = 10;
	            	$onStage.count = $data.total_rows;
	            	$onStage.taskIds = _.map($data.data, 'task_id');
	            	$onStage.offset = $onStage.taskIds.length;
	    		}
	    		const wStage = {
			        ..._self.comStage.state,
			        objData: {
			            ..._self.comStage.state.objData,
			            columns: $lstStage
			        }
			    }
			    _self.comStage.setState(wStage);
			    if ($onIndex + 1 < $lstStage.length){
			    	return setTimeout(async function(){
			    		await _self.recurStages($activeWmsId, $lstStage, $onIndex + 1, function($arg){
		                	//
		                })
			    	}, 1800);
				}
				else {
					return $callback(_self.comStage);
				}
	    	});
	    	Util.toast({
	    		loading: 'Have loading the data on ' + $onStage.name,
	    		success: 'Have got the data of ' + $onStage.name,
                error: 'The data have missed on ' + $onStage.name,

	    	}, 'promise', $request);
		}
		else {
			return $callback(false);
		}
	};
	this.newStage = async function($index) {
		/*let _self = this;
		let itemColum = {
			id: _self.comStage.state.lstStages.length + 1,
	        name: "0. Support - backlog",
	        icon: "../../media/icon/urgent.svg",
	        bguid: Math.floor(Math.random() * 11) + 1,
	        count: '99+'
		};
		_self.comStage.state.lstStages.splice($index + 1, 0, itemColum);*/
	};
	this.getLstTasks = async function($activeWmsId, $step, $rows = 10, $offset = 0, $callback) {
		let _self = this;
		let objPaging = {
			wflow_id: $activeWmsId,
			stage_step: $step,
			rows: $rows,
			offset: $offset,
		};
        await ServiceTinfo.instance.pagingTinfo(objPaging).then(({ data }) => {
            if (data.status) {
                const tasks = data.data;
                let prev_tasks = _self.comStage.state.objData.tasks;
                let new_tasks = _.uniqBy(_.concat(prev_tasks, tasks), 'task_id');
                const wStage = {
			        ..._self.comStage.state,
			        objData: {
			            ..._self.comStage.state.objData,
			            tasks: new_tasks
			        }
			    }
			    _self.comStage.setState(wStage);
			    return $callback(_self.comStage, data);
            } else {
                return $callback(false, data.error);
            }
        })
	};
}