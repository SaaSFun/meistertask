import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceWinfo {
    static instance = ServiceWinfo.instance || new ServiceWinfo();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingWinfo = (data) =>{
        return axios.post(`${API_ROOT}/pagingWinfo`, data, this.headers);
    }

    showWinfo = (id) =>{
        return axios.get(`${API_ROOT}/showWinfo/${id}`, this.headers);
    }
    
    storeWinfo = (data) =>{
        return axios.post(`${API_ROOT}/storeWinfo`, data, this.headers);
    }

    updateWinfo = (id, data) =>{
        return axios.post(`${API_ROOT}/updateWinfo/${id}`, data, this.headers);
    }

    deleteWinfo = (id) =>{
        return axios.delete(`${API_ROOT}/deleteWinfo/${id}`, this.headers);
    }
}