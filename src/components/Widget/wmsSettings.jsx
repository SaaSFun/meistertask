// import npm packge
import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, //
	Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, } from 'reactstrap';
import axios from 'axios';
// import service api
import ServiceAuth  from '../../services/ServiceAuth';
import { AvatarCom }  from './AvatarCom';
// import core class
//
// import com page
//
// import modal tool
//
// import style media
import { FcBusinessman } from "react-icons/fc";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineRoomPreferences, MdLogout, MdSettings } from "react-icons/md";
import ReactCountryFlag from "react-country-flag"
import { PiArchiveDuotone, PiCopySimpleBold } from "react-icons/pi";
import { TbPackageExport } from "react-icons/tb";
// coding
function SProfile($this) {
	let _self = $this.wms_class;
	let _data = _self.objData.profiles;
	let _popover = _self.objData.profiles.popover;
	let _action = _popover.action;
	const handleLogout = () => {
        ServiceAuth.instance.logout()
        .then(({ data }) => {
            window.location.assign('/access');
        })
        .catch(() => {
            window.location.assign('/access');
        });
	}
	return (
		<UncontrolledDropdown>
		    <DropdownToggle color="light" className={`d-flex align-items-center hover-effect-none bg-transparent border-0`}>
		        <AvatarCom member={_data} width={'32'} height={'32'}/>
		    </DropdownToggle>
		    <DropdownMenu end flip className={`border-0 mt-2 me-1`}
		    	style={{width: `var(--pix-w-270)`}}
		    >
		        <DropdownItem text className={`text-center`}>
		            <Card className={`border-0`}>
						<AvatarCom member={_data} width={'90'} height={'90'}/>
						<CardTitle tag="h5" className={`mt-2`}>
					      	{_data.fullname}
					    </CardTitle>
					    <CardSubtitle
							className="mb-2 text-muted fw-normal"
							tag="h6"
					    >
					      	{_data.email}
					    </CardSubtitle>
					    <CardText className={`card-text bg-light text-info px-1 py-1 fw-bolder fs-6`}>
							{_data.role}
					    </CardText>
					</Card>
		        </DropdownItem >
		        <DropdownItem  divider>
		        </DropdownItem >
		        <DropdownItem color='transparent' tag="div" className={`d-flex justify-content-evenly fs-6 fw-normal hover-none hover-effect-border text-muted`}>
		        	<Button color='light' className={`text-muted hover-effect hover-effect-border d-flex align-items-center py-0 ${_data.language == 'VN' ? 'active' : ''}`}>
		        		<ReactCountryFlag
			                countryCode="VN"
			                svg
			                style={{
			                    width: '24px',
			                    height: '24px',
			                }}
			                className={`me-1`}
			            /> VietNam
		        	</Button>
		        	<Button color='light' className={`text-muted hover-effect hover-effect-border d-flex align-items-center py-0 ${_data.language == 'EN' ? 'active' : ''}`}>
		        		<ReactCountryFlag
			                countryCode="US"
			                svg
			                style={{
			                    width: '24px',
			                    height: '24px',
			                }}
			                className={`me-1`}
			            /> English
		        	</Button>
		        </DropdownItem >
		        <DropdownItem  divider>
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-content-center flex-wrap fs-5 fw-normal hover-effect-border text-muted mx-3`}  onClick={() => $this.header_self.toggleModalProfile()}>
		            <RiAccountCircleLine className={`me-1`} size="32"/> {_data.popover.action.account}
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-content-center flex-wrap fs-5 fw-normal hover-effect-border text-muted mx-3`}>
		            <MdOutlineRoomPreferences className={`me-1`} size="32"/> {_data.popover.action.preferences}
		        </DropdownItem >
		        <DropdownItem  divider>
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-content-center flex-wrap fs-5 fw-normal hover-effect-border text-muted mx-3`} onClick={() => handleLogout()}>
		            <MdLogout className={`me-1`} size="32"/> {_data.popover.action.logout}
		        </DropdownItem >
		    </DropdownMenu >
		</UncontrolledDropdown>
	);
};
function SWorkflow($this) {
	let _self = $this.wms_class;
	let _popover = _self.objData.workfolows.popover;
	let _action = _popover.action;
	return (
		<UncontrolledDropdown>
		    <DropdownToggle caret color="light" className={`hover-effect-border fw-bolder text-secondary`}>
		        {_self.objData.workfolows.name}
		    </DropdownToggle>
		    <DropdownMenu end flip className={`border-0 mt-2`}>
		        <DropdownItem  header>
		            {_popover.name}
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-items-center hover-effect-border`}  onClick={() => $this.header_self.toggleModalWinfo()}>
		            <MdSettings className={`me-1`} /> {_action.setting}
		        </DropdownItem >
		        <DropdownItem  divider>
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-items-center hover-effect-border`}>
		            <PiCopySimpleBold className={`me-1`} /> {_action.duplicate}
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-items-center hover-effect-border`}>
		            <PiArchiveDuotone className={`me-1`} /> {_action.archived}
		        </DropdownItem >
		        <DropdownItem className={`d-flex align-items-center hover-effect-border`}>
		            <TbPackageExport className={`me-1`} /> {_action.export}
		        </DropdownItem >
		        <DropdownItem  divider>
		        </DropdownItem >
		        <DropdownItem className={`text-danger text-center hover-effect-border`}>
		            {_action.delete}
		        </DropdownItem >
		    </DropdownMenu >
		</UncontrolledDropdown>
	);
};
export {SProfile, SWorkflow};