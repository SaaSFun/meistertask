// import npm packge
import React, {  } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
// import service api
//
// import core class
// 
// import com page
import Header from '../../components/Header';
import Home from '../../components/Home';
import LeftNav from '../../components/LeftNav';
import RightBar from '../../components/RightBar';
// import modal tool
//
// import style media
import "./default.css";
// coding
export class Phome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wms_class: this.props.data,
        }
    };
    componentWillMount() {
        //
    };
    componentDidMount() {
        //
    };
    render() {
        return (
            <div id="wrapper" className={`overflow-hidden`}>
                <LeftNav />
                {/*Page Content*/}
                <div id="page-content-wrapper">
                    <Header appName="WorkfowMS" currentUser={``} wms_class={this.state.wms_class} react={this}/>
                    <div className="workflowms-container d-flex overflow-hidden">
                        <Switch><Route exact path="/" render={(props) => ( <Home {...props} wms_class={this.state.wms_class}/> )}/></Switch>
                        <RightBar wms_class={this.state.wms_class} react={this}/>
                    </div>
                    <Toaster position="bottom-left" reverseOrder={false} />
                </div>
                {/*/#page-content-wrapper*/}
            </div>
            /*/#wrapper*/
        );
    };
}