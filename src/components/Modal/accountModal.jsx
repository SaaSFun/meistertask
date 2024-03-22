// import npm packge
import React, { useState } from 'react';
import {
    Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, //
    Card, CardHeader, CardBody, CardImg, CardText, ListGroup, ListGroupItem, InputGroup, InputGroupText, //
    UncontrolledDropdown, Badge, DropdownToggle, DropdownMenu, DropdownItem, CardTitle, CardSubtitle, //
    UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody
} from 'reactstrap';
// import service api
import ServiceUser  from '../../services/ServiceUser';
// import core class
import Util from '../../core/util';
// import com page
import {UploadAndDisplayImage} from './../Widget/wmsUploadDisplay';
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
import { FcBusinessman, FcBusinesswoman, FcLike, FcCheckmark, FcCloseUpMode } from "react-icons/fc";
import './default.css';
// coding
function AccountProfile($this) {
    const [modal, setModal] = useState(false);
    $this.header_self.toggleModalProfile = () => setModal(!modal);
    let [ProfileDetail, setProfile] = useState($this.wms_class.objData.profiles);
    const handleChange = (event) => {
    	event.preventDefault();
    	const {name, value} = event.target;
        setProfile(prev => ({...prev, [name]: value }));
    }
    const updateUser = (e) => {
    	e.preventDefault();
    	if (ProfileDetail.password != '' && ProfileDetail.password == '') {
    		return Util.toast("Please fill input confirm password!", 'error');
    	}
    	if (ProfileDetail.password != '' && ProfileDetail.password != '' && ProfileDetail.password != ProfileDetail.password) {
    		return Util.toast("Confirm Password not match!", 'error');
    	}
    	const {fullname, email, password} = ProfileDetail;
    	const data = {
    		fullname: fullname,
    		username: email,
    		avatar: $this.wms_class.objData.profiles.avatar,
    	};
    	if (password != '') {
    		data.password = password;
    	}
    	ServiceUser.instance.updateUser($this.wms_class.objData.profiles.uid, data)
        .then(({ data }) => {
            if (data.status) {
                Util.toast(data.success);
                $this.header_self.toggleModalProfile();
                $this.wms_class.objData.profiles.fullname = ProfileDetail.fullname;
	            $this.wms_class.objData.profiles.email = ProfileDetail.email;
	            $this.wms_class.objData.profiles.avatar = ProfileDetail.avatar;
	            const profileStage = {
			        ...$this.wms_class.comStage.state,
			        objData: {
			            ...$this.wms_class.comStage.state.objData,
			            profiles: $this.wms_class.objData.profiles
			        }
			    }
			    $this.wms_class.comStage.setState(profileStage);
			    $this.wms_class.react.setState({ wms_class: $this.wms_class.comStage });
            } else {
                Util.toast(data.error, 'error')
            }
        })
    }
    return (
        <Modal isOpen={modal} toggle={$this.header_self.toggleModalProfile} {...$this} size={`lg`} scrollable={true}
			>
		    <ModalHeader toggle={$this.header_self.toggleModalProfile}
		    	className={``}>
				Profile Account
		    </ModalHeader>
    		<Form onSubmit={updateUser} className={`mb-0`}>
			    <ModalBody className={`d-flex gap-3 pb-0`}>
			    	<div className={`maintask-left h-100`} style={{width: 'var(--per-wi-66)'}}>
		    			<FormGroup>
		    				<Label>
		    					Fullname
		    				</Label>
						    <Input name="fullname" placeholder="Fullname" type="text" value={ProfileDetail.fullname} onChange={handleChange} required />
					    </FormGroup>
					    <FormGroup>
						    <Label>
						    	Username
						    </Label>
					    	<Input name="username" placeholder="Username" type="text" value={ProfileDetail.email} onChange={handleChange} required />
					    </FormGroup>
					    <FormGroup>
						    <Label>
						    	Password
						    </Label>
						    <Input name="password" placeholder="Password" type="password" onChange={handleChange} />
					    </FormGroup>
					    <FormGroup>
						    <Label>
						    	Confirm Password
						    </Label>
						    <Input name="confirmpassword" placeholder="Confirm Password" type="password" onChange={handleChange} />
					    </FormGroup>
			    	</div>
			    	<div className={`maintask-right h-100`} style={{width: 'var(--per-wi-34)'}}>
			    		<UploadAndDisplayImage className="text-center p-3" wms_class={$this.wms_class} react={$this.react} account_self={this}/>
			    	</div>
			    </ModalBody>
				<ModalFooter>
		          	<Button color="primary" type="submit">
		            	Update
		          	</Button>{' '}
		          	<Button color="secondary" onClick={$this.header_self.toggleModalProfile}>
		            	Cancel
		          	</Button>
		        </ModalFooter>
		    </Form>
		</Modal>
    );
};
export { AccountProfile };