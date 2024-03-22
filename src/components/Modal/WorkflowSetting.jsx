// import npm packge
import React, { useState, useEffect } from 'react';
import {
    Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, //
    Table, Badge 
} from 'reactstrap';
import Select from 'react-select';
import _ from 'lodash';
// import serivce api
import ServiceConfig  from '../../services/ServiceConfig';
import ServiceWinfo  from '../../services/ServiceWinfo';
import ServiceWchlist  from '../../services/ServiceWchlist';
import ServiceWstep  from '../../services/ServiceWstep';
import ServiceWtags  from '../../services/ServiceWtags';
import ServiceWfields  from '../../services/ServiceWfields';
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
import { MdOutlineAdd, MdOutlineSave, MdOutlineClear } from "react-icons/md";
import './default.css';
function WorkflowSetting($this) {
    useEffect(() => {
        // console.log('debug workfolowsdata is: ', workfolows);
    }, [workfolows]);
    const [modal, setModal] = useState(false);
    const [workfolows, setWorkflows] = useState({name: '', described: '', owner_by: '', createb_on: '', created_by: ''});
    // State for current active Tab
    const [currentActiveTab, setCurrentActiveTab] = useState('info');
    const [selectedWstep, setSelectedWstep] = useState(null);
    const [wstepList, setWstepList] = useState([]);
    const [Wchecklists, setWchecklists] = useState([]);
    const [Wtags, setWtags] = useState([]);
    const [listColors, setListColors] = useState([]);
    const [Wfields, setWfields] = useState([]);
    const [preferenceTables, setPreferenceTables] = useState([]);
    const [Elements, setElements] = useState([]);
    const [Fieldtypes, setFieldtypes] = useState([]);
    const [modeLink, setMode] = useState(false);

    // Toggle active state for Tab
    const toggleTab = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
        switch(true){
            case currentActiveTab !== tab && tab == 'info':
                showWinfo();
                break;
            case currentActiveTab !== tab && tab == 'checklist':
                getWchecklist();
                break;
            case currentActiveTab !== tab && tab == 'tag':
                getWtags();
                break;
            case currentActiveTab !== tab && tab == 'field':
                getWfields();
                break;
        }
    }
    $this.header_self.toggleModalWinfo = () => {
        if (!modal) {
            setWorkflows({});
            $this.wms_class.getLstMembers($this.wms_class.comStage.state.objData.workfolows.id, function($argmb, $statusmb){
                if($argmb){
                    $this.wms_class.react.setState({wms_class: $argmb});
                    showWinfo();
                }
                else {
                    Util.toast($statusmb.error, 'error');
                }
            });
        }
        setModal(!modal)
    };
    const showWinfo = () => {
        ServiceWinfo.instance.showWinfo($this.wms_class.comStage.state.objData.workfolows.id)
        .then(async ({ data }) => {
            data.owner_by = Util.getFullname(($this.wms_class.comStage && $this.wms_class.comStage.state.lstMembers //
                ? $this.wms_class.comStage.state.lstMembers : []), data.owner);
            data.created_by = Util.getFullname(($this.wms_class.comStage && $this.wms_class.comStage.state.lstMembers //
                ? $this.wms_class.comStage.state.lstMembers : []), data.created_by);
            $this.wms_class.react.setState({ wms_class: $this.wms_class.comStage });
            setWorkflows(data);
        })
        .catch(() => {
            //
        });
    }
    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setWorkflows(prev => ({...prev, [name]: value }));
    }
    const onSubmitWinfo = (e) => {
        e.preventDefault();
        ServiceWinfo.instance.updateWinfo($this.wms_class.comStage.state.objData.workfolows.id, {name: workfolows.name, described: workfolows.described})
        .then(({ data }) => {
            if (data.status) {
                $this.wms_class.comStage.workflowman.objData.workfolows.name = workfolows.name;
                $this.react.setState({ wms_class: $this.react.state.wms_class });
                Util.toast(data.success);
            } else {
                Util.toast(data.error, 'error');
            }
        })
    }
    //wchecklist
    const getWchecklist = () => {
        ServiceWstep.instance.pagingWstep({wflow_id:$this.wms_class.comStage.state.objData.workfolows.id}).then(({ data }) => {
            if (data.status) {
                setWstepList(_.filter(data.data, function(o) { return o.parent_uid; }));
            } else {
                Util.toast(data.error, 'error')
            }
        })
        ServiceWchlist.instance.pagingWchlist({wflow_id:$this.wms_class.comStage.state.objData.workfolows.id}).then(({ data }) => {
            if (data.status) {
                setWchecklists(data.data);
            } else {
                Util.toast(data.error, 'error')
            }
        })
    }
    const onSelectedWstep = (wstep) => {
        let checklists = [...Wchecklists];
        checklists.unshift({wflow_id: $this.wms_class.comStage.state.objData.workfolows.id, step: wstep.uid, content: wstep.name, index: ''});
        setWchecklists(checklists);
    }
    const handleChangeWchecklist = (event, i) => {
        event.preventDefault();
        const {name, value} = event.target;
        let checklists = [...Wchecklists];
        checklists[i][name] = value;
        setWchecklists(checklists);
    }
    const onSubmitChecklist = (checklist) => {
        if (checklist.id) {
            const id = checklist.id;
            delete checklist.id;
            ServiceWchlist.instance.updateWchlist(id, checklist)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWchecklist();
            })
        } else {
            ServiceWchlist.instance.storeWchlist(checklist)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWchecklist();
            })
        }
    }
    const onDeleteChecklist = (id, i) => {
        if (!id) {
            setWchecklists([
                ...Wchecklists.slice(0, i),
                ...Wchecklists.slice(i + 1)
            ]);
        } else {
            ServiceWchlist.instance.deleteWchlist(id)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWchecklist();
            })
        }   
    }
    //wtags
    const getWtags = () => {
        setListColors($this.wms_class.comStage.state.lstColors)
        $this.wms_class.getLstTags($this.wms_class.comStage.state.objData.workfolows.id, function($argmb, $res){
            if($argmb){
                setWtags($res.data);
                $this.wms_class.react.setState({wms_class: $argmb});
            }
            else {
                Util.toast($res.error, 'error');
            }
        });
    }
    const addTag = () => {
        let wtags = [...Wtags];
        const random_color = _.sample($this.wms_class.comStage.state.lstColors);
        wtags.unshift({background: random_color ? random_color.hexcode : '#cccccc', name: '', wflow_id: $this.wms_class.comStage.state.objData.workfolows.id});
        setWtags(wtags);
    }
    const handleChangeWtag = (event, i) => {
        event.preventDefault();
        const {name, value} = event.target;
        let wtags = [...Wtags];
        wtags[i][name] = value;
        setWtags(wtags);
    }
    const onClickColor = (e, i, hexcode) => {
        e.preventDefault();
        let wtags = [...Wtags];
        wtags[i]['background'] = hexcode;
        setWtags(wtags);
    }
    const onSubmitWtag = (tag) => {
        if (tag.id) {
            const id = tag.id;
            delete tag.id;
            ServiceWtags.instance.updateWtags(id, tag)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWtags();
            })
        } else {
            ServiceWtags.instance.storeWtags(tag)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWtags();
            })
        }
    }
    const onDeleteWtag= (id, i) => {
        if (!id) {
            setWtags([
                ...Wtags.slice(0, i),
                ...Wtags.slice(i + 1)
            ]);
        } else {
            ServiceWtags.instance.deleteWtags(id)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWtags();
            })
        }   
    }
    //wfields
    const getWfields = () => {
        ServiceConfig.instance.wreferences().then(({ data }) => {
            setPreferenceTables(data);
        })
        ServiceWfields.instance.pagingWfields({wflow_id:$this.wms_class.comStage.state.objData.workfolows.id}).then(({ data }) => {
            if (data.status) {
                setWfields(data.data);
            } else {
                Util.toast(data.error, 'error')
            }
        })
        let elements = _.filter($this.wms_class.comStage.state.lstConstants, { 'mode': 'element' });
        setElements(elements);
        let fieldtypes = _.filter($this.wms_class.comStage.state.lstConstants, { 'mode': 'fieldtype' });
        setFieldtypes(fieldtypes);
    }
    const addField = () => {
        let wfields = [...Wfields];
        wfields.unshift({mode: 'core', wflow_id: $this.wms_class.comStage.state.objData.workfolows.id, name: '', fieldtype: '', element: '', name: '', value: ''});
        setWfields(wfields);
    }
    const onSelectedOption = (table) => {
        let value = 'select * from ' + table.table_name;
        let wfields = [...Wfields];
        wfields.unshift({mode: 'link', wflow_id: $this.wms_class.comStage.state.objData.workfolows.id, name: '', fieldtype: '', element: '', name: '', value: value});
        setWfields(wfields);
    }
    const handleChangeWfield = (event, i) => {
        event.preventDefault();
        const {name, value} = event.target;
        let wfields = [...Wfields];
        wfields[i][name] = value;
        setWfields(wfields);
    }
    const onSubmitWfield = (field) => {
        if (field.id) {
            const id = field.id;
            delete field.id;
            ServiceWfields.instance.updateWfields(id, field)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWfields();
            })
        } else {
            ServiceWfields.instance.storeWfields(field)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWfields();
            })
        }
    }
    const onDeleteWfield= (id, i) => {
        if (!id) {
            setWfields([
                ...Wfields.slice(0, i),
                ...Wfields.slice(i + 1)
            ]);
        } else {
            ServiceWfields.instance.deleteWfields(id)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getWfields();
            })
        }   
    }

    return (
        <Modal isOpen={modal} toggle={$this.header_self.toggleModalWinfo} {...$this} size={`lg`} scrollable={true}
            >
            <ModalHeader toggle={$this.header_self.toggleModalWinfo}
                className={``}>
                Workflow Settings
            </ModalHeader>
            <ModalBody className={`pb-0`}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={currentActiveTab === 'info' ? "active" : undefined}
                            onClick={() => { toggleTab('info'); }}
                        >
                            Info
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={currentActiveTab === 'checklist' ? "active" : undefined}
                            onClick={() => { toggleTab('checklist'); }}
                        >
                            Checklists
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={currentActiveTab === 'tag' ? "active" : undefined}
                            onClick={() => { toggleTab('tag'); }}
                        >
                            Tags
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={currentActiveTab === 'field' ? "active" : undefined}
                            onClick={() => { toggleTab('field'); }}
                        >
                            Fields
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={currentActiveTab}>
                    <TabPane tabId="info">
                        <Form className="mt-3 mb-0" onSubmit={onSubmitWinfo}>
                            <FormGroup>
                                <Label for="workflow-name">
                                    Name
                                </Label>
                                <Input
                                    id="workflow-name"
                                    name="name"
                                    defaultValue={workfolows.name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="described">
                                    Described
                                </Label>
                                <Input
                                    id="described"
                                    name="described"
                                    defaultValue={workfolows.described}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="owner">
                                            Owned by
                                        </Label>
                                        <Input
                                            id="owner"
                                            name="owner_by"
                                            disabled
                                            defaultValue={workfolows.owner_by}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                    <Label for="created_on">
                                        Created on
                                    </Label>
                                    <Input
                                        id="created_on"
                                        name="created_on"
                                        disabled
                                        defaultValue={Util.formatDateTime(workfolows.created_at)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                    <Label for="created_by">
                                        Created by
                                    </Label>
                                    <Input
                                        id="created_by"
                                        name="created_by"
                                        disabled
                                        defaultValue={workfolows.created_by}
                                    />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="primary">
                                    Update
                                </Button>
                            </ModalFooter>
                        </Form>
                    </TabPane>
                    <TabPane tabId="checklist">
                        <div className={`d-flex my-3`}>
                            <Row className="row-cols-lg-auto g-3 align-items-center">
                                <Col style={{width: 'var(--pix-w-270)'}}>
                                    <Select options={wstepList} defaultValue={selectedWstep} onChange={onSelectedWstep}/>
                                </Col>
                            </Row>
                        </div>
                        <Table striped className={`mb-3`}>
                            <thead>
                                <tr>
                                    <th>
                                        Index
                                    </th>
                                    <th>
                                        Content
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {Wchecklists.length > 0 && Wchecklists.map((checklist, i) =>
                                <tr key={i}>
                                    <td className={`align-middle`}>
                                        <Input name="index" placeholder="Index" type="number" value={checklist.index} onChange={(e) => handleChangeWchecklist(e, i)} />
                                    </td>
                                    <td className={`align-middle`}>
                                        <Input name="content" placeholder="Content" type="text" value={checklist.content} disabled />
                                    </td>
                                    <td className={`align-middle`}>
                                        <div className={`d-flex align-items-center`}>
                                            <MdOutlineSave title="Save Checklist" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${checklist.content ? '' : 'invisible'}`} onClick={() => onSubmitChecklist(checklist)} />
                                            <MdOutlineClear title="Delete Checklist" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1`} onClick={() => onDeleteChecklist(checklist.id, i)} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="tag">
                        <div className={`d-flex my-3`}>
                            <Row className="row-cols-lg-auto g-3 align-items-center">
                                {(Wtags.length == 0 || Wtags[0].id) && (<Col>
                                    <MdOutlineAdd title="Add Tag" size="30" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} onClick={addTag} />
                                </Col>)}
                            </Row>
                        </div>
                        <Table striped className={`mb-3`}>
                            <thead>
                                <tr>
                                    <th>
                                        Content
                                    </th>
                                    <th>
                                        Color
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Wtags.length > 0 && Wtags.map((tag, i) =>
                                <tr key={i}>
                                    <td className={`align-middle`}>
                                        <Input name="name" placeholder="Content" type="text" value={tag.name} onChange={(e) => handleChangeWtag(e, i)}/>
                                    </td>
                                    <td className={`align-middle`}>
                                        <div className={`winfo-tags d-flex align-items-center gap-1`}>
                                        {listColors.length > 0 && listColors.map((color, j) =>
                                            <Badge color="skip" key={`wstage-color` + color.id} id={`wstage-color` + color.id} tag="button" pill className={`hover-opacity-7per border-1 border-light ${color.hexcode == tag.background ? 'on-selected' : ''}`} title={color.name} 
                                                style={{
                                                    backgroundColor: color.hexcode,
                                                }}
                                                onClick={(e) => onClickColor(e, i, color.hexcode)}
                                            >&nbsp;</Badge>
                                        )}
                                        </div>
                                    </td>
                                    <td className={`align-middle`}>
                                        <div className={`d-flex align-items-center`}>
                                            <MdOutlineSave title="Save Tag" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${tag.name && tag.background ? '' : 'invisible'}`} onClick={() => onSubmitWtag(tag)} />
                                            <MdOutlineClear title="Delete Tag" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1`}  onClick={() => onDeleteWtag(tag.id, i)} />
                                        </div>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="field">
                        <div className={`d-flex my-3`}>
                            <Row className="row-cols-lg-auto g-3 align-items-center">
                                <Col>
                                    <FormGroup switch>
                                        <Input type="switch" role="switch" defaultChecked={modeLink} onClick={() => { setMode(!modeLink); }} disabled={Wfields.length && !Wfields[0].id} />
                                        <Label check>Mode Link</Label>
                                    </FormGroup>
                                </Col>
                                {(Wfields.length == 0 || Wfields[0].id) && (
                                <Col style={{width: 'var(--pix-w-270)'}}>
                                    {modeLink && (<Select options={preferenceTables} defaultValue="" onChange={onSelectedOption}/>)}
                                    {!modeLink && (<MdOutlineAdd title="Add Field" size="30" className={`bg-light hover-effect-border rounded-circle p-1 text-muted`} onClick={addField} />)}
                                </Col>
                                )}
                            </Row>
                        </div>
                        <Table striped className={`mb-3`}>
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Fieldtype
                                    </th>
                                    <th>
                                        Element
                                    </th>
                                    <th>
                                        Value
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Wfields.length > 0 && Wfields.map((field, i) =>
                                <tr key={i}>
                                    <td className={`align-middle`}>
                                        <Input name="name" placeholder="Name" type="text" value={field.name} onChange={(e) => handleChangeWfield(e, i)}/>
                                    </td>
                                    <td className={`align-middle`}>
                                        <Input name="fieldtype" type="select" value={field.fieldtype} onChange={(e) => handleChangeWfield(e, i)}>
                                            <option value="">
                                                Select Fieldtype
                                            </option>
                                            {Fieldtypes.length > 0 && Fieldtypes.map((fieldtype, j) =>
                                            <option key={j} value={fieldtype.identifier}>
                                                {fieldtype.name}
                                            </option>
                                            )}
                                        </Input>
                                    </td>
                                    <td className={`align-middle`}>
                                        <Input name="element" type="select" value={field.element} onChange={(e) => handleChangeWfield(e, i)}>
                                            <option value="">
                                                Select Element
                                            </option>
                                            {Elements.length > 0 && Elements.map((element, k) =>
                                            <option key={k} value={element.identifier}>
                                                {element.name}
                                            </option>
                                            )}
                                        </Input>
                                    </td>
                                    <td className={`align-middle`}>
                                        <Input name="value" placeholder="Value" type="text" value={field.value ? field.value : ''} onChange={(e) => handleChangeWfield(e, i)}/>
                                    </td>
                                    <td className={`align-middle`}>
                                        <div className={`d-flex align-items-center`}>
                                            <MdOutlineSave title="Save Field" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${field.name && field.fieldtype && field.element ? '' : 'invisible'}`} onClick={() => onSubmitWfield(field)} />
                                            <MdOutlineClear title="Delete Field" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1`}  onClick={() => onDeleteWfield(field.id, i)} />
                                        </div>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </Table>
                    </TabPane>
                </TabContent>
            </ModalBody>
        </Modal>
    );
};
export { WorkflowSetting };