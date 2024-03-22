import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceWtags {
    static instance = ServiceWtags.instance || new ServiceWtags();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingWtags = (data) =>{
        return axios.post(`${API_ROOT}/pagingWtags`, data, this.headers);
    }
    
    storeWtags = (data) =>{
        return axios.post(`${API_ROOT}/storeWtags`, data, this.headers);
    }

    updateWtags = (id, data) =>{
        return axios.post(`${API_ROOT}/updateWtags/${id}`, data, this.headers);
    }

    deleteWtags = (id) =>{
        return axios.delete(`${API_ROOT}/deleteWtags/${id}`, this.headers);
    }

    assignTtags = (data) =>{
        return axios.post(`${API_ROOT}/assignTtags`, data, this.headers);
    }

    removeTtags = (data) =>{
        return axios.post(`${API_ROOT}/removeTtags`, data, this.headers);
    }
}