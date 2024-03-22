// import npm packge
import React, { useState } from 'react';
import _ from 'lodash';
import {
    Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, //
    Input, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardImg, Table, Row, Col,
} from 'reactstrap';
import Select, { components } from 'react-select';
// import service api
import ServiceUser from '../../services/ServiceUser';
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
import { FcBusinessman, FcBusinesswoman, FcLike, FcCheckmark, FcCloseUpMode } from "react-icons/fc";
import { MdOutlineAdd, MdOutlineSave, MdOutlineClear } from "react-icons/md";
import './default.css';
// coding
const { Option } = components;
const CustomSelectOption = props => (
    <Option {...props} className={`d-flex align-items-center`}>
        <Button className={`hover-effect-none bg-transparent border-0 ms-1 px-0 py-0 d-flex align-self-start avatar-name`}>
            <img className={`rounded-circle bg-light border`} src={props.data.avatar} alt="avatar" />
        </Button>
        {props.data.label}
    </Option>
);
const CustomSelectValue = props => (
    <div className={`d-flex align-items-center`}>
        <Button className={`hover-effect-none bg-transparent border-0 ms-1 px-0 py-0 d-flex align-self-start avatar-name`}>
            <img className={`rounded-circle bg-light border`} src={props.data.avatar} alt="avatar" />
        </Button>
        {props.data.label}
    </div>
);
function ManageMember($this) {
    const [modal, setModal] = useState(false);
    const [modeLink, setMode] = useState(false);
    const [selectedMember, setSelectedMember] = useState([]);
    const [linkUsers, setLinkedUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const $rootreact = $this.react.props.data.react;
    $this.react.toggleModalUsers = () => {
        if (!modal) {
            getMembers(false);
        }
        setModal(!modal)
    };
    const getMembers = (overwrite = true) => {
        setSelectedMember([]);
        $this.wms_class.getLstMembers($this.wms_class.comStage.state.objData.workfolows.id, function($argmb, $statusmb){
            if($argmb){
                setSelectedMember($argmb.state.lstMembers);
                $rootreact.setState({wms_class: $argmb});
                ServiceUser.instance.getLinkedUser()
                .then(({ data }) => {
                    if (data.status) {
                        setLinkedUsers(data.data);
                    } else {
                        Util.toast(data.error, 'error')
                    }
                })
            }
            else {
                Util.toast($statusmb.error, 'error');
            }
        });
        ServiceUser.instance.getLinkedUser().then(({ data }) => {
            if (data.status) {
                setLinkedUsers(data.data);
            } else {
                Util.toast(data.error, 'error')
            }
        })
    }
    const addMemberList = () => {
        let members = [...selectedMember];
        members.unshift({mode: 'core', username: '', fullname: '', password: ''});
        setSelectedMember(members);
    }
    const onSelectedOption = (member) => {
        let members = [...selectedMember];
        members.unshift({mode: 'link', username: member.username, fullname: member.fullname, password: ''});
        setSelectedMember(members);
    }
    const handleChange = (event, i) => {
        event.preventDefault();
        const {name, value} = event.target;
        let members = [...selectedMember];
        members[i][name] = value;
        setSelectedMember(members);
    }
    const onSubmitMember = (member) => {
        if (member.uid) {
            const uid = member.uid;
            delete member.uid;
            ServiceUser.instance.updateUser(uid, member)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getMembers();
            })
        } else {
            ServiceUser.instance.storeUser(member)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getMembers();
            })
        }
    }
    const handleCheck = (e, uid) => {
        e.preventDefault();
        const member = {
            assign: uid,
            wflow_id: $this.react.props.data.objData.workfolows.id,
        };
        if (e.target.checked) {
            ServiceUser.instance.assignWmber(member)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getMembers();
            })
        } else {
            ServiceUser.instance.removeWmber(member)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getMembers();
            })
        }
    }
    const onDeleteMember = (uid, i) => {
        if (!uid) {
            setSelectedMember([
                ...selectedMember.slice(0, i),
                ...selectedMember.slice(i + 1)
            ]);
        } else {
            ServiceUser.instance.deleteUser(uid)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getMembers();
            })
        }   
    }
    return (
        <Modal isOpen={modal} toggle={$this.react.toggleModalUsers} {...$this} fullscreen={true} size={`lg`} scrollable={true}
            >
            <ModalHeader toggle={$this.react.toggleModalUsers}
                className={``}>
                Member Account
            </ModalHeader>
            <ModalBody className={`gap-3 mb-0`}>
                <div className={`d-flex`}>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <FormGroup switch>
                                <Input type="switch" role="switch" defaultChecked={modeLink} onClick={() => { setMode(!modeLink); }} disabled={selectedMember.length && !selectedMember[0].uid} />
                                <Label check>Mode Link</Label>
                            </FormGroup>
                        </Col>
                        {(selectedMember.length == 0 || selectedMember[0].uid) && (<Col style={{width: 'var(--pix-w-270)'}}>
                            {modeLink && (<Select
                                defaultValue={selectedOption}
                                options={linkUsers}
                                components={{
                                    Option: CustomSelectOption,
                                    SingleValue: CustomSelectValue
                                }}
                                onChange={onSelectedOption}
                            />)}
                            {!modeLink && (<MdOutlineAdd title="Add User" size="30" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} onClick={addMemberList} />)}
                        </Col>)}
                    </Row>
                </div>
                <Table striped className={`mb-0`}>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Username
                            </th>
                            <th>
                                Fullname
                            </th>
                            <th>
                                Password
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {selectedMember.length > 0 && selectedMember.map((member, i) =>
                        <tr key={i}>
                            <th scope="member" className={`align-middle`}>
                                {i + 1}
                            </th>
                            <td className={`align-middle`}>
                                <Input name="username" placeholder="Username" type="text" value={member.username} onChange={(e) => handleChange(e, i)} />
                            </td>
                            <td className={`align-middle`}>
                                <Input name="fullname" placeholder="Fullname" type="text" value={member.fullname} onChange={(e) => handleChange(e, i)} />
                            </td>
                            <td className={`align-middle`}>
                                <Input name="password" placeholder="Password" type="text" value={member.password} onChange={(e) => handleChange(e, i)} />
                            </td>
                            <td className={`align-middle`}>
                                <div className={`d-flex align-items-center`}>
                                    <MdOutlineSave title="Save User" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${member.username && member.fullname && (member.uid || member.password) ? '' : 'invisible'}`} onClick={() => onSubmitMember(member)} />
                                    <InputGroup className={`rounded-circle mx-1 p-1 item-do-list hover-effect ${member.uid && member.uid != $this.react.props.data.objData.profiles.uid ? '' : 'invisible'}`}
                                        style={{cursor: 'initial', width: 'var(--per-w-24)' }}>
                                        <label  className={`align-self-start checkcontainer`} style={{cursor: 'pointer'}}>
                                            <Input onChange={(e) => handleCheck(e, member.uid)}
                                                addon
                                                aria-label="Check Completed"
                                                type="checkbox"
                                                defaultChecked={member.isMember}
                                                disabled={member.uid == $this.react.props.data.objData.profiles.uid}
                                            />
                                            <InputGroupText className="checkmark"></InputGroupText>
                                        </label>
                                    </InputGroup>
                                    <MdOutlineClear title="Delete User" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${member.uid != $this.react.props.data.objData.profiles.uid ? '' : 'invisible'}`} onClick={() => onDeleteMember(member.uid, i)} />
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={$this.react.toggleModalUsers}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};
export { ManageMember };