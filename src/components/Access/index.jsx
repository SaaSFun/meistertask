// import npm packge
import React, { } from 'react';
import {
    MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';
// import service api
//
// import core class
import ServiceAuth  from '../../services/ServiceAuth';
import { API_ROOT } from '../../core/constant';
// import com page
//
// import modal tool
//
// import style media
import "./default.css";
// coding
export default class Access extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaces: [],
            justifyActive: 'signin',
            remember :false,
        };
    }
    componentWillMount() {
        //
    };
    componentWillUnmount() {
        // this.props.onUnload();
    };
    componentDidMount() {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        if (access_token) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('verify_code');
            localStorage.removeItem('fe_domain');
            localStorage.removeItem('username');
            localStorage.removeItem('hashtoken');
        }
        axios.get(API_ROOT+`/workspaces`)
        .then(res => {
            this.setState({ workspaces: res.data });
            this.setState({ workspace_id: res.data[0].id });
        })
    };
    componentDidUpdate(prevProps, prevState) {
        //
    };
    handleJustifyClick = (value) => {
        if (value === this.state.justifyActive) {
            return;
        }
        this.setState({ justifyActive: value });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleRemember = (e) => {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    };
    handleLogin = () => {
        const { workspace_id, username, password, remember } = this.state;
        const credentials = {
            workspace_id,
            username,
            password,
            remember,
        };
        ServiceAuth.instance.login(credentials)
        .then(({ data }) => {
            if (data && data.status && data.status == true) {
                console.log(data.success)
                localStorage.setItem('access_token', JSON.stringify(data.token));
                localStorage.setItem('verify_code', JSON.stringify(data.workspace.verify_code));
                localStorage.setItem('fe_domain', JSON.stringify(data.workspace.fe_domain));
                localStorage.setItem('username', JSON.stringify(data.username));
                localStorage.setItem('hashtoken', JSON.stringify(data.hashtoken));
                window.location.assign('/');
            } else {
                console.log(data.error)
            }
        })
        .catch((e) => {
            console.log(e)
        });
    };
    render() {
        return (
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => this.handleJustifyClick('signin')} active={this.state.justifyActive === 'signin'} className={`w-auto`}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => this.handleJustifyClick('signup')} active={this.state.justifyActive === 'signup'} className={`w-auto`}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={this.state.justifyActive === 'signin'}>
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='facebook-f' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='twitter' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='google' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='github' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                            </div>
                            <p className="text-center mt-3">or:</p>
                        </div>
                        <MDBInput wrapperClass='mb-4' label='Email or Username' type='email' name="username" onChange={this.handleChange}/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" onChange={this.handleChange}/>
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='remember' value='' id='flexCheckDefault' label='Remember me' onChange={this.handleRemember} />
                            <a href="!#">Forgot password?</a>
                        </div>
                        <MDBBtn className="mb-4 w-100" onClick={() => this.handleLogin()}>Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="#!">Register</a></p>
                    </MDBTabsPane>
                    <MDBTabsPane show={this.state.justifyActive === 'signup'}>
                        <div className="text-center mb-3">
                            <p>Sign un with:</p>
                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='facebook-f' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='twitter' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='google' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                                <MDBBtn tag='button' color='none' className='m-1 p-2 btn btn-light rounded-circle hover-opacity-5per d-flex justify-content-center btn-social'>
                                    <MDBIcon fab icon='github' size="sm" className={`mt-1`}/>
                                </MDBBtn>
                            </div>
                            <p className="text-center mt-3">or:</p>
                        </div>
                        <MDBInput wrapperClass='mb-4' label='Name' type='text'/>
                        <MDBInput wrapperClass='mb-4' label='Username' type='text'/>
                        <MDBInput wrapperClass='mb-4' label='Email' type='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' type='password'/>
                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                        </div>
                        <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        );
    }
}