// import npm packge
import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import { InputGroup, Input, Button, //
	  } from 'reactstrap';
// import service api
//
// import core class
import { store } from "../../store";
import Util from '../../core/util';
// import com page
import {SProfile, SWorkflow} from './../Widget/wmsSettings';
import {AccountProfile} from './../Modal/accountModal';
import {WorkflowSetting} from './../Modal/WorkflowSetting';
import {TrackingTime} from './../Stage/Task';
// import modal tool
//
// import style media
import {
  	faBars, faEllipsisV, faMagnifyingGlass, faFilter
} from "@fortawesome/free-solid-svg-icons";
import SVG from "react-inlinesvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RxDividerVertical } from "react-icons/rx";
import { FaFileDownload, FaHireAHelper, FaRegBell, FaPlusCircle } from "react-icons/fa";
import { FaRegCircleStop } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import "./default.css";
// coding
export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//
		};
	}
	componentDidMount() {
		$("#menu-toggle").click(function (e) {
		    e.preventDefault();
		    $("#wrapper").toggleClass("toggled");
		});
		$("#menu-toggle").trigger('click');
	};
	render() {
		let _self = this.props.wms_class;
		let _data = _self.objData;
		let _statis = _self.objData.workfolows.statis;
	    return (
	      	<nav className="navbar navbar-default">
		      	<div className="container-fluid flex-nowrap">
		      		<div className="navbar-header d-flex align-items-center">
						<a href="#" className="btn btn-light hover-effect-border d-flex align-self-center disabled" id="menu-toggle" title={`Open / Close Menu`}><FontAwesomeIcon className={`py-1`} icon={faBars} /></a>
						<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
			          	<SWorkflow wms_class={this.props.wms_class} react={this.props.react} header_self={this}/>
                		<WorkflowSetting wms_class={this.props.wms_class} react={this.props.react} header_self={this}/>
			        </div>
			        <div className="d-flex">
			        	<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-white" /></div>
			        	<button type="button" className="btn btn-light hover-effect-border d-flex align-self-center py-2" title={`New Stage`}><FaPlusCircle  /></button>
			        	<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
						{/*<div className="d-flex align-self-center btn btn-danger px-0 py-0">
							<Button color='transparent' className="btn d-flex align-self-center"><FaRegCircleStop color="white"/></Button>
							<h6 className="label label-default my-1 pe-2">{_data.ontrack}</h6>
						</div>*/}
						{_self && _self.comStage && _self.comStage.state && _self.comStage.state.objData && _self.comStage.state.objData.task_id > 0 ? (
							<TrackingTime module={'root'} task_id={_self.comStage.state.objData.task_id} task_time={_self.comStage.state.objData.tasktime} isRunning={_self.comStage.state.objData.isRunning} wms_class={_self} />
						) : (<button type="button" className="btn btn-light hover-effect-border d-flex align-self-center py-2" title={`Timer`}><MdOutlineTimer /></button>)}
						<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
						<div className="btn disabled btn-light fw-bold d-flex align-self-center"><span className="badge bg-light text-dark my-1 ps-0 d-flex align-self-center">{_statis.data}</span>{_statis.name}</div>
			          	<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
						<InputGroup className={`w-auto d-flex align-self-center flex-nowrap`} title={`Search`}>
							<Input placeholder={_data.inputsearch} className={`border-light`} style={{width: `var(--pix-w-210)`}}/>
							<Button className={`btn-light hover-effect-border`}>
							  	<FontAwesomeIcon icon={faMagnifyingGlass} />
							</Button>
						</InputGroup>
						<a href="#" className="btn btn-light hover-effect-border d-flex align-self-center" title={`Option`}><FontAwesomeIcon className={`py-1`} icon={faEllipsisV} /></a>
						<Button onClick={() => _self.renderWidth(_self.rightFilterShowing)} id="wms-advance-filter" color="light" className="hover-effect-border d-flex align-self-center" title={`Filter`}><FontAwesomeIcon className={`py-1`} icon={faFilter} /></Button>
			          	<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
						<button type="button" className="btn btn-light hover-effect-border d-flex align-self-center py-2" title={`Export`}><FaFileDownload  /></button>
						<Button color='light' className="hover-effect-border d-flex align-self-center btn btn-light position-relative py-2" title={`Notifications`}>
								<FaRegBell />
						  		<span style={{fontSize: `var(--fs-9)`}} className="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle text-white top-0 start-100">{_data.noticount}</span>
						</Button>
						<div className="btn disabled btn-light d-flex align-self-center bg-transparent border-0"><RxDividerVertical className="text-black-50" /></div>
			        	<button type="button" className="btn btn-light hover-effect-border d-flex align-self-center py-2" title={`Help`}><FaHireAHelper /></button>
						<SProfile wms_class={this.props.wms_class} react={this.props.react} header_self={this}/>
			          	<AccountProfile wms_class={this.props.wms_class} react={this.props.react} header_self={this}/>
			        </div>
		      	</div>
	      	</nav>
    	);
	}
}