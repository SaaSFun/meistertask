// import npm packge
import React from "react";
import { ListGroup, ListGroupItem, CardImg } from 'reactstrap';
// import service api
//
// import core class
import Util from '../../core/util';
// import com page
import { AvatarCom } from '../Widget/AvatarCom';
import {MainFilter} from './AdvanceFilter';
// import modal tool
import {ManageMember} from '../Modal/memberModal';
// import style media
import { TbProgressHelp } from "react-icons/tb"; 
import { GrAddCircle } from "react-icons/gr";
import "./default.css";
// coding
class RightBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    };
    render() {
        let _self = this.props;
        return (
            [
                <ManageMember key="index-memeberaccount" wms_class={_self.wms_class} react={_self.react}/>,
                <div key="index-rightbar" className="right-container d-flex flex-column justify-content-start position-absolute end-0 h-100 text-white bg-dark bg-gradient" >
                    <ListGroup tag="div" flush className={``}>
                        <div className={`profile-item hover-opacity-5per`}>
                            <ListGroupItem
                                action
                                tag="button"
                                className={`bg-transparent btn-light d-flex justify-content-center border-0 mb-0`}
                            >
                                <TbProgressHelp size="34" className={`rounded-circle bg-light bg-gradient`} />
                            </ListGroupItem>
                            <h6 style={{fontSize: `var(--fs-9)`}} className={`text-center mb-0`}>Unassign...</h6>
                            <h6 style={{fontSize: `var(--fs-11)`}} className={`text-center text-secondary`}>99+</h6>
                        </div>
                        <div className={`profile-item hover-opacity-5per`}>
                            <ListGroupItem
                                action
                                tag="button"
                                className={`bg-transparent btn-transparent d-flex justify-content-center border-0 mb-0`}
                            >
                                <GrAddCircle size="36" className={`rounded-circle bg-gradient`} style={{background: `var(--bs-cyan)`}} onClick={() => this.props.react.toggleModalUsers()}/>
                            </ListGroupItem>
                            <hr style={{fontSize: `var(--fs-9)`}} className={`text-center my-0`} />
                        </div>
                        <div className={`profile-item hover-opacity-5per`}>
                            <div className={`profile-item`}>
                                <ListGroupItem
                                    active
                                    action
                                    tag="button"
                                    className={`bg-light btn-light d-flex justify-content-center border-0 mb-0`}
                                >
                                    <AvatarCom member={this.props.wms_class.comStage ? this.props.wms_class.comStage.state.objData.profiles : {}} width={'32'} height={'32'}/>
                                </ListGroupItem>
                                <h6 style={{fontSize: `var(--fs-9)`}} className={`text-center mb-0`}>{this.props.wms_class.comStage ? this.props.wms_class.comStage.state.objData.profiles.fullname : ''}</h6>
                                <h6 style={{fontSize: `var(--fs-11)`}} className={`text-center text-secondary`}>99+</h6>
                            </div>
                        </div>
                        {this.props.wms_class.comStage && this.props.wms_class.comStage.state.lstMembers && this.props.wms_class.comStage.state.lstMembers.length > 0 && this.props.wms_class.comStage.state.lstMembers.map((member, i) =>
                            <div className={`profile-item hover-opacity-5per`} key={i}>
                                {member.isMember && member.uid != this.props.wms_class.objData.profiles.uid && (
                                    <div className={`profile-item `}>
                                        <ListGroupItem
                                            action
                                            tag="button"
                                            className={`bg-transparent btn-light d-flex justify-content-center border-0 mb-0`}
                                        >
                                            <AvatarCom member={member} width={'32'} height={'32'}/>
                                        </ListGroupItem>
                                        <h6 style={{fontSize: `var(--fs-9)`}} className={`text-center mb-0`}>{member.fullname}</h6>
                                        <h6 style={{fontSize: `var(--fs-11)`}} className={`text-center text-secondary`}>99+</h6>
                                    </div>
                                )}
                            </div>
                        )}
                    </ListGroup>
                    <MainFilter />
                </div>
            ]
        );
    }
}
export default RightBar;