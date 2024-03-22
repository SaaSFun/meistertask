// import npm packge
import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import { } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
// import service api
//
// import core class
import Util from '../../core/util';
// import com page
import Stage from '../Stage';
import {TDetail} from '../Stage/Task';
import {WorkflowStage} from '../Modal/WorkflowStage';
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
import { MdOutlineAdd } from "react-icons/md";
import './default.css'
// coding
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            objData: [],
            lstIcons: [],
            lstColors: [],
            lstTags: [],
            lstWinfos: [],
            lstMembers: [],
        };
        this.workflowman = {};
    };
    componentWillMount() {
        //
    };
    componentWillUnmount() {
        // this.props.onUnload();
    };
    async componentDidMount() {
        this.workflowman = this.props.wms_class;
        this.setState({ objData: this.workflowman.objData });
        this.setState({ lstIcons: this.workflowman.lstIcons });
        this.setState({ lstColors: this.workflowman.lstColors });
        this.setState({ lstConstants: this.workflowman.lstConstants });
        this.setState({ lstTags: this.workflowman.lstTags });
        this.setState({ lstWinfos: this.workflowman.lstWinfos });
        this.setState({ lstMembers: this.workflowman.lstMembers });
        this.setState({ rightFilterShowing: this.workflowman.rightFilterShowing });
        this.workflowman.comStage = this;
        await this;
    };
    componentDidUpdate(prevProps, prevState) {
        //
    };
    render() {
        let _self = this;
        return (
            <div className={`position-absolute home-container ${_self.state.rightFilterShowing == true ? 'right-filter-showing' : ''}`}>
                <div className="kanban-board-wms">
                    <div className={'kanban-container'} style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                        <DragDropContext 
                            onDragEnd={this.workflowman.onDragEnd}
                        >
                        {_self.state && _self.state.objData && _self.state.objData.columns && _self.state.objData.columns.length > 0 && _self.state.objData.columns.map((column, i) => {  
                            let tasks = _.map(column.taskIds, function(task_id) { 
                                return _.find(_self.state.objData.tasks, {task_id: task_id}); 
                            });
                            return column.status == 'active' ? <Stage index={i} key={column.id} column={column} tasks={tasks} react={_self} /> : ''
                        }
                        )}
                        </DragDropContext>
                        <div className={'stage-plus'}>
                            <div className={'px-2 stage-header stage-id-plus px-2 stage-header stage-id-plus shadow-none'}>
                                <MdOutlineAdd title="Add Stage" size="36"className={`bg-light hover-effect-border rounded-circle p-1 text-muted`}  onClick={() => this.toggleModalSinfo()} />
                                <WorkflowStage wms_class={this.workflowman} react={_self} header_self={this}/>
                            </div>
                        </div>
                    </div>
                </div>
                <TDetail wms_class={this.workflowman} react={_self} header_self={this}/>
            </div>
        );
    }
}