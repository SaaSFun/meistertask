import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceTinfo {
    static instance = ServiceTinfo.instance || new ServiceTinfo();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingTinfo = (data) =>{
        return axios.post(`${API_ROOT}/pagingTinfo`, data, this.headers);
    }
    
    storeTinfo = (data) =>{
        return axios.post(`${API_ROOT}/storeTinfo`, data, this.headers);
    }

    showTinfo = (id) =>{
        return axios.get(`${API_ROOT}/showTinfo/${id}`, this.headers);
    }

    updateTinfo = (id, data) =>{
        return axios.post(`${API_ROOT}/updateTinfo/${id}`, data, this.headers);
    }

    deleteTinfo = (id) =>{
        return axios.delete(`${API_ROOT}/deleteTinfo/${id}`, this.headers);
    }

    assignTmber = (data) =>{
        return axios.post(`${API_ROOT}/assignTmber`, data, this.headers);
    }

    removeTmber = (data) =>{
        return axios.post(`${API_ROOT}/removeTmber`, data, this.headers);
    }
}