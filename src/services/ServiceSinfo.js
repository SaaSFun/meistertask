import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceSinfo {
    static instance = ServiceSinfo.instance || new ServiceSinfo();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingSinfo = (data) =>{
        return axios.post(`${API_ROOT}/pagingSinfo`, data, this.headers);
    }
    
    storeSinfo = (data) =>{
        return axios.post(`${API_ROOT}/storeSinfo`, data, this.headers);
    }

    updateSinfo = (id, data) =>{
        return axios.post(`${API_ROOT}/updateSinfo/${id}`, data, this.headers);
    }

    deleteSinfo = (id) =>{
        return axios.delete(`${API_ROOT}/deleteSinfo/${id}`, this.headers);
    }
}