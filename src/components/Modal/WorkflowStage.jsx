// import npm packge
import React, { useState, useEffect } from 'react';
import {
    Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, //
    Table, Badge, InputGroup, InputGroupText
} from 'reactstrap';
import Select from 'react-select';
import _ from 'lodash';
// import serivce api
import ServiceSinfo  from '../../services/ServiceSinfo';
import ServiceWstep  from '../../services/ServiceWstep';
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
import { MdOutlineAdd, MdOutlineSave, MdOutlineClear } from "react-icons/md";
import './default.css';
function WorkflowStage($this) {
    const [modal, setModal] = useState(false);
    const [selectedWstep, setSelectedWstep] = useState(null);
    const [wstepList, setWstepList] = useState([]);
    const [Sinfo, setSinfo] = useState([]);
    const [listColors, setListColors] = useState([]);
    const [listIcons, setListIcons] = useState([]);

    $this.header_self.toggleModalSinfo = () => {
        if (!modal) {
            setListColors($this.wms_class.comStage.state.lstColors)
            setListIcons($this.wms_class.comStage.state.lstIcons)
            getSinfo();
        }
        setModal(!modal)
    };
    //wsinfo
    const getSinfo = () => {
        ServiceWstep.instance.pagingWstep({wflow_id:$this.wms_class.comStage.state.objData.workfolows.id}).then(({ data }) => {
            if (data.status) {
                setWstepList(_.filter(data.data, function(o) { return !o.parent_uid; }));
            } else {
                Util.toast(data.error, 'error')
            }
        })
        setSinfo([]);
        $this.wms_class.getLstStages($this.wms_class.comStage.state.objData.workfolows.id, function($argst, $status){
            if($argst){
                setSinfo($argst.state.objData.columns);
            }
            else {
                Util.toast($status.error, 'error');
            }
        });
    }
    const onSelectedWstep = (wstep) => {
        let sinfo = [...Sinfo];
        const random_color = _.sample($this.wms_class.comStage.state.lstColors);
        const lsteachcate = Util.listIconBy($this.wms_class.comStage.state.lstIcons);
        const random_icon = _.sample(lsteachcate);
        sinfo.unshift({workflow_id: $this.wms_class.comStage.state.objData.workfolows.id, 
            step: wstep.identifier, 
            name: wstep.name, 
            status: 'active', 
            sort_uid: 'asc', 
            background: random_color ? random_color.hexcode : '#cccccc', 
            image: random_icon ? random_icon.path : '', 
            index: ''
        });
        setSinfo(sinfo);
    }
    const handleChangeSinfo = (event, i) => {
        event.preventDefault();
        const {name, value} = event.target;
        let sinfo = [...Sinfo];
        sinfo[i][name] = value;
        setSinfo(sinfo);
    }
    const handleCheck = (e, sinfo) => {
        e.preventDefault();
        const id = sinfo.id;
        delete sinfo.id;
        sinfo.status = e.target.checked ? 'active' : 'deactive';
        ServiceSinfo.instance.updateSinfo(id, sinfo)
        .then(({ data }) => {
            if (data.status) {
                Util.toast(data.success)
            } else {
                Util.toast(data.error, 'error')
            }
            getSinfo();
        })
    }
    const onSubmitSinfo = (sinfo) => {
        if (sinfo.id) {
            const id = sinfo.id;
            delete sinfo.id;
            ServiceSinfo.instance.updateSinfo(id, sinfo)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getSinfo();
            })
        } else {
            ServiceSinfo.instance.storeSinfo(sinfo)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getSinfo();
            })
        }
    }
    const onDeleteSinfo = (id, i) => {
        if (!id) {
            setSinfo([
                ...Sinfo.slice(0, i),
                ...Sinfo.slice(i + 1)
            ]);
        } else {
            ServiceSinfo.instance.deleteSinfo(id)
            .then(({ data }) => {
                if (data.status) {
                    Util.toast(data.success)
                } else {
                    Util.toast(data.error, 'error')
                }
                getSinfo();
            })
        }   
    }

    return (
        <Modal isOpen={modal} toggle={$this.header_self.toggleModalSinfo} {...$this} size={`lg`} scrollable={true}
            >
            <ModalHeader toggle={$this.header_self.toggleModalSinfo}
                className={``}>
                Workflow Stage
            </ModalHeader>
            <ModalBody className={`pb-0`}>
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
                                Icon
                            </th>
                            <th>
                                Index
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Sinfo.length > 0 && Sinfo.map((sinfo, i) =>
                        <tr key={i}>
                            <td className={`align-middle`}>
                                <Badge color={`skip`} title={sinfo.name} 
                                    className={`text-white border-0`}
                                    style={{ backgroundColor: sinfo.background }}
                                >
                                    <SVG src={sinfo.image}
                                        width={24}
                                        height={24}
                                        title={sinfo.name}
                                        className={`text-white`}
                                    />
                                </Badge>
                            </td>
                            <td className={`align-middle`}>
                                <Input name="index" placeholder="Index" type="number" value={sinfo.index} onChange={(e) => handleChangeSinfo(e, i)} />
                            </td>
                            <td className={`align-middle`}>
                                <Input name="name" placeholder="Name" type="text" value={sinfo.name} onChange={(e) => handleChangeSinfo(e, i)} />
                            </td>
                            <td className={`align-middle`}>
                                <div className={`d-flex align-items-center`}>
                                    <MdOutlineSave title="Save Sinfo" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1 ${sinfo.name ? '' : 'invisible'}`} onClick={() => onSubmitSinfo(sinfo)} />
                                    <InputGroup className={`rounded-circle mx-1 p-1 item-do-list hover-effect ${sinfo.id ? '' : 'invisible'}`}
                                        style={{cursor: 'initial', width: 'var(--per-w-24)' }}>
                                        <label  className={`align-self-start checkcontainer`} style={{cursor: 'pointer'}}>
                                            <Input onChange={(e) => handleCheck(e, sinfo)}
                                                addon
                                                aria-label="Check Completed"
                                                type="checkbox"
                                                checked={sinfo.status == 'active'}
                                            />
                                            <InputGroupText className="checkmark"></InputGroupText>
                                        </label>
                                    </InputGroup>
                                    <MdOutlineClear title="Delete Sinfo" size="30"className={`bg-light hover-effect-border rounded-circle text-muted p-1 mx-1`} onClick={() => onDeleteSinfo(sinfo.id, i)} />
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </ModalBody>
        </Modal>
    );
};
export { WorkflowStage };