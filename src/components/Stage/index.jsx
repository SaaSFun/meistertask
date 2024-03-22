// import npm packge
import React from "react";
import {Droppable, Draggable} from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars-2';
import $ from 'jquery';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardHeader, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, //
        Badge, Button } from 'reactstrap';
// import service api
import ServiceSinfo  from '../../services/ServiceSinfo';       
// import core class
import Util from '../../core/util';
// import com page
// import modal tool
import {PopoverStyle} from "./../Modal/popoverModal";
import {ColorWMSPicker, IconWMSPicker} from './../Widget/wmsPickers';
// import style media
import SVG from 'react-inlinesvg';
import { IoSettingsOutline } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineCalendarToday, MdOutlinePending, MdOutlinePreview, //
    MdOutlineCheckCircle, MdOutlineAccessTime, MdOutlineCancel, MdOutlineCalendarMonth, MdOutlineMessage, MdOutlineChecklist, MdOutlineAttachment, //
    MdOutlineTimer
} from "react-icons/md";
import "./default.css";
// coding
class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    };
    Tags($_self, $tagid ) {
        let itemtag = Util.indexTagbyId($_self.state.lstTags, $tagid);
        return (
            itemtag ? <div
                key={'tag-' + $tagid}
                className={`d-flex align-items-center mt-1 me-1 i-tag`}
            >
                <Badge color="transparents"
                    style={{background: itemtag.background}}>
                    {itemtag.name}
                </Badge>
            </div> : ''
        )
    };
    jobResult($_self, $result, $type, $ontrack){
        let _result = _.find($_self.state.lstConstants, { identifier: $result});
        let _bgcolor = Util.indexColorbyId($_self.state.lstColors, _result ? _result.bgrid : false);
        let _txtcolor = _bgcolor;
        let _icon = _.find(Util.listIconBy($_self.state.lstIcons), { id: _result ? _result.icoid : false});
        let _type = _.find($_self.state.lstConstants, { identifier: $type});
        let _rgbcolor = Util.hex2Rgb(_bgcolor, 10);
        _bgcolor = _rgbcolor ? _rgbcolor.rgb.replace(/rgb/i, "rgba") : _bgcolor.replace(/\)/i,',0.1)');
        return $result != 'pending' && _result && _bgcolor ? (
            <div className={`task-job-result ${$ontrack ? 'bg-danger text-white' : ''}`}>
                {$ontrack ? (
                <CardHeader
                    className={`border-0 rounded-0 opacity-75 fw-bolder d-flex justify-content-start py-0 px-3`}
                >
                    <MdOutlineTimer size="24" className={`me-auto d-flex align-self-center`} />
                    <div className={`me-auto d-flex align-self-center`}>On Tracking</div>
                    <div className={`d-flex align-self-center small fw-normal`}></div>
                </CardHeader>
                ) : (
                <CardHeader
                    className={`border-0 rounded-0 opacity-75 fw-bolder d-flex justify-content-start py-0 px-3`}
                    style={{backgroundColor: _bgcolor, color: _txtcolor}}
                >
                    {_icon && (<SVG src={_icon.path}
                        width={21}
                        height={21}
                        className={`me-auto d-flex align-self-center`}
                    />)}
                    <div className={`me-auto d-flex align-self-center`}>{_result.name}</div>
                    <div className={`d-flex align-self-center small fw-normal`}>{_type ? _type.name : ''}</div>
                </CardHeader>
                )}
            </div>
        ) : '';
    };
    onJob(task, index, react) {
        if (!task) {
            return '';
        }
        const _assign = _.find(react.state.lstMembers, { uid: task.assign});
        const _overdue = _.find(react.state.lstConstants, { identifier: 'overdue'});
        const _bgcolor = Util.indexColorbyId(react.state.lstColors, _overdue ? _overdue.bgrid : false);
        return (
            <Draggable draggableId={task.task_id} index={index} key={task.task_id}>
                {(provided) => (
                    <div
                        className={`item-drop-task`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Card onClick={() => react.toggleMTD(task.uid)}
                            className={`border-top-0 border-bottom-1 border-start-0 border-end-0 rounded-0`}
                        >
                            {this.jobResult(this.props.react, task.result, task.type, react.state.objData.task_id == task.uid)}
                            {task.pathfile && (<div className={`d-flex justify-content-center`}>
                                    <CardImg
                                        className={`border-0 rounded-0 p-1`}
                                        alt="Thumbnail"
                                        src={task.pathfile}
                                        top
                                        width="100%"
                                        style={{maxHeight: `var(--pix-h-210)`, objectFit: `cover`}}
                                    />
                                </div>
                            )}
                            <CardBody
                                className={`px-3 pt-2 pb-1`}
                            >
                                <CardTitle tag="div" className={`d-flex justify-content-start`}>
                                    <h6 className={`me-auto mb-0 d-flex align-self-start`} style={{textAlign: `var(--text-justify)`}}>{task.name}</h6>
                                    <Button className={`hover-effect-none bg-transparent border-0 ms-1 px-0 py-0 d-flex align-self-start avatar-name`} title={`Your Name`}>
                                        <FcBusinessman size="24" className={`rounded-circle bg-light border d-none`}/>
                                        <img className={`rounded-circle bg-light border`} src={_assign.avatar} />
                                        <p className={`rounded-circle bg-light border small d-none`}>SD</p>
                                    </Button>
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-1 text-muted"
                                    tag="h6"
                                >
                                    {task.fname_client}
                                </CardSubtitle>
                                <CardText>
                                    {task.fany_custom}
                                </CardText>
                            </CardBody>
                            <CardFooter
                                className={`border-0 rounded-0 d-flex flex-wrap bg-transparent text-muted pb-1`}
                                style={{fontSize: `var(--fs-12)`}}
                            >
                                {
                                    task.overdue ? <div
                                        className={`d-flex align-items-center me-2 task-overdue `}
                                        style={{color: _bgcolor}}
                                    >
                                        <MdOutlineCalendarToday className={`me-1`} size="15" />
                                        <div className={``}>{Util.formatDateTime(task.overdue, react.state.objData.workspace.date_fm)}</div>
                                    </div> : ''
                                }
                                {
                                    task.indue ? <div
                                        className={`d-flex align-items-center me-2 task-indue`}
                                    >
                                    <MdOutlineCalendarMonth className={`me-1`} size="15" />
                                    <div className={``}>{Util.formatDateTime(task.indue, react.state.objData.workspace.date_fm)}</div>
                                    </div> : ''
                                }
                                {
                                    typeof task.countmsg === 'number' && isFinite(task.countmsg) ? <div
                                        className={`d-flex align-items-center me-2 task-messenger`}
                                    >
                                    <MdOutlineMessage className={`me-1`} size="15" />
                                    <div className={``}>{Util.renderNumberPlus(task.countmsg)}</div>
                                    </div> : ''
                                }
                                {
                                    task.checklist ? <div
                                        className={`d-flex align-items-center me-2 task-checklist`}
                                    >
                                    <MdOutlineChecklist className={`me-1`} size="15" />
                                    <div className={``}>{task.checklist}</div>
                                    </div> : ''
                                }
                                {
                                    task.attach ? <div
                                        className={`d-flex align-items-center me-2 task-attach`}
                                    >
                                    <MdOutlineAttachment className={`me-1`} size="15" />
                                    <div className={``}>{Util.renderNumberPlus(task.attach)}</div>
                                    </div> : ''
                                }
                                {
                                    task.tags && task.tags.split(',').length > 0 ? task.tags.split(',').map((idx) => (
                                        this.Tags(this.props.react, parseInt(idx))
                                    )) : ''
                                }
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    };
    handleChangeSinfo = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.overwriteStage('name', value);
    }
    overwriteStage = (key, value) => {
        let comStage = this.props.react.workflowman.comStage;
        comStage.state.objData.columns[this.props.index][key] = value;
        const wStage = {
            ...comStage.state,
            objData: {
                ...comStage.state.objData,
                columns: comStage.state.objData.columns
            }
        }
        comStage.setState(wStage);
    }
    outFocusStageName = (event) => {
        event.preventDefault();
        let comStage = this.props.react.workflowman.comStage;
        const sinfo = {...comStage.state.objData.columns[this.props.index]};
        const id = sinfo.id;
        delete sinfo.id;
        this.updateSinfo(id, sinfo);
    }
    updateSinfo = (id, sinfo) => {
        ServiceSinfo.instance.updateSinfo(id, sinfo)
        .then(({ data }) => {
            if (data.status) {
                //
            } else {
                Util.toast(data.error, 'error')
            }
        })
    }
    onClickColor = (stage, color) => {
        const sinfo = {...stage};
        const id = sinfo.id;
        delete sinfo.id;
        sinfo.background = color.hexcode;
        sinfo.bgrid = color.id;
        this.overwriteStage('background', color.hexcode);
        this.overwriteStage('bgrid', color.bgrid);
        this.updateSinfo(id, sinfo);
    }
    onClickIcon = (stage, icon) => {
        const sinfo = {...stage};
        const id = sinfo.id;
        delete sinfo.id;
        sinfo.image = icon.path;
        sinfo.icoid = icon.id;
        this.overwriteStage('image', icon.path);
        this.overwriteStage('icoid', icon.id);
        this.updateSinfo(id, sinfo);
    }
    handleUpdate(e){
        let _self = this;
        let comStage = _self.props.react.workflowman.comStage;
        if (e.scrollHeight - e.clientHeight > 0 && e.scrollTop > e.scrollHeight - e.clientHeight - 5 && _self.state.isLoading == false && comStage.state.objData.columns[_self.props.index]['count'] > comStage.state.objData.columns[_self.props.index]['taskIds'].length){
            _self.setState({isLoading:true});
            comStage.workflowman.getLstTasks(comStage.state.objData.workfolows.id, _self.props.column.step, _self.props.column.rows, _self.props.column.offset, function($comStage, $data){
                if ($comStage) {
                    _self.setState({isLoading:false});
                    comStage.state.objData.columns[_self.props.index]['current_page'] = $data.current_page;
                    comStage.state.objData.columns[_self.props.index]['taskIds'] = _.uniq(_.concat(comStage.state.objData.columns[_self.props.index]['taskIds'], _.map($data.data, 'task_id')));
                    const wStage = {
                        ...comStage.state,
                        objData: {
                            ...comStage.state.objData,
                            columns: comStage.state.objData.columns
                        }
                    }
                    comStage.setState(wStage);
                } else {
                    _self.setState({isLoading:true});
                }   
            });
        }
    }
    render() {
        return (
            <div className={'stage-' + this.props.column.id} style={{ minWidth: 280, maxWidth: 280}}>
                <div className={'px-2 stage-header' + ' stage-id-' + this.props.column.id} style={{ backgroundColor: this.props.column.background }}>
                    <div className="stage-header-icon">
                        <div className={`d-flex justify-content-end`} style={{ width: 70}}>
                            <SVG className="header_icon-urgent text-white" src={this.props.column.image}/>
                        </div>
                    </div>
                    {
                        <input className={'form-control form-control-md bg-transparent text-white fw-bolder hover-effect hover-effect px-2 text-nowrap border-0 '  + 'stgname-' + this.props.column.id}
                            type="text"
                            placeholder="Stage Name"
                            value={this.props.column.name}
                            id={'stgip-' + this.props.column.id}
                            name='name'
                            onChange={(event) => this.handleChangeSinfo(event)}
                            onBlur={(event) => this.outFocusStageName(event)} />
                    }
                    <div className={`d-flex justify-content-end setting-stage`}>
                        {
                            <Button type="button" id={'popoverStage-' + this.props.column.id} title={`Setting`}
                                className={`btn border-0 hover-effect bg-transparent px-2 py-2 w-auto h-auto me-0 d-flex justify-content-end d-none`}>
                                <IoSettingsOutline color="white" size="24"/>
                            </Button>
                        }
                        {
                            <div className="">
                                <Badge className="bg-transparent">
                                    {Util.renderNumberPlus(this.props.column.count)}
                                </Badge>
                            </div>
                        }
                    </div>
                    <PopoverStyle 
                        react={this.props.react}
                        target={'popoverStage-' + this.props.column.id}
                        lcontent={
                            <PerfectScrollbar>
                                <IconWMSPicker react={this.props.react} moreicon={false} header_self={this} stage={this.props.column} />
                                <ColorWMSPicker react={this.props.react} header_self={this} stage={this.props.column} />
                            </PerfectScrollbar>
                        }
                        rcontent={
                            <PerfectScrollbar>
                                <IconWMSPicker react={this.props.react} moreicon={true} header_self={this} stage={this.props.column} />
                            </PerfectScrollbar>
                        }
                    />
                </div>
                <Scrollbars
                    onScroll={this.handleScroll}
                    onScrollFrame={this.handleScrollFrame}
                    onScrollStart={this.handleScrollStart}
                    onScrollStop={this.handleScrollStop}
                    onUpdate={this.handleUpdate}
                    renderView={this.renderView}
                    renderTrackHorizontal={this.renderTrackHorizontal}
                    renderTrackVertical={this.renderTrackVertical}
                    renderThumbHorizontal={this.renderThumbHorizontal}
                    renderThumbVertical={this.renderThumbVertical}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={`calc(100vh - 115px)`}
                    autoHeightMax={`calc(100vh - 115px)`}
                    thumbMinSize={30}
                    universal={true}
                    {...this.props}>
                    <Droppable droppableId={this.props.column.step} >
                    {(provided) => {
                        return (
                            <div
                                style={{minHeight: `calc(100vh - 115px)`}}
                                className={`container-drop-task`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                              {this.props.tasks.map((task, index) => this.onJob(task, index, this.props.react))}
                              {provided.placeholder}
                            </div>
                        )   
                    }}
                    </Droppable>
                </Scrollbars>
            </div>
        )
    }
};
export default Stage;