// import npm packge
import React, { } from 'react';
import _ from 'lodash';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import service api
//
// import core class
import { } from '../core/constant';
import Util from '../core/util';
import wmsCls from "../core/wmsCls";
// import com page
import {Phome} from "../pages/home";
import {Paccess} from "../pages/access";
// import modal tool
//
// import style media
import "./default.css";
// coding
const wms_class = new wmsCls();
export default class Pages extends React.Component {
    constructor(props) {
        super(props);
        wms_class.initial(this);
        this.state = {
            wms_class: wms_class
        }
    };
    componentWillMount() {
        //
    };
    componentDidMount() {
        let _self = this;
        if (window.location.pathname == '/access') {
            return;
        }
        wms_class.checkLogin(function($arg, $status){
            if($arg){
                wms_class.getLstColors();
                wms_class.getLstIcons();
                wms_class.getWconfigs();
                wms_class.getLstWinfos(function($argwif, $statuswif){
                    if($argwif){
                        wms_class.getLstMembers($argwif.state.objData.workfolows.id, function($argmb, $statusmb){
                            if($argmb){
                                // _self.setState({wms_class: $argmb});
                                wms_class.getLstStages($argwif.state.objData.workfolows.id, function($argstg, $statusst){
                                    if($argstg){
                                        _self.setState({wms_class: $argstg});
                                    }
                                    else {
                                        // alert($statusst.error);
                                    }
                                });
                                wms_class.getLstTags($argwif.state.objData.workfolows.id, function($argtag, $statustag){
                                    if($argtag){
                                        _self.setState({wms_class: $argtag});
                                    }
                                    else {
                                        // alert($statustag.error);
                                    }
                                });
                            }
                            else {
                                // alert($statusmb.error);
                            }
                        });
                        _self.setState({wms_class: $argwif});
                    }
                    else {
                        // alert($statuswif.error);
                    }
                });
                _self.setState({wms_class: $arg});
            }
            else {
                _self.setState({wms_class: $status});
                // alert($status.error);
            }
        });
    };
    /*etc https://viblo.asia/p/vong-doi-cua-component-trong-react-gGJ59XaJlX2*/
    render() {
        if (this.state.wms_class.state && !this.state.wms_class.state.isLogin && window.location.pathname != '/access') {
            return <Redirect to={'/access'} />;
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => ( <Phome {...props} data={wms_class}/> )}/>
                    <Route exact path="/access" render={(props) => ( <Paccess {...props} data={wms_class}/> )}/>
                </Switch>
            </BrowserRouter>
        );
    };
}