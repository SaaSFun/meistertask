import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceTlist {
    static instance = ServiceTlist.instance || new ServiceTlist();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };
    
    storeTlist = (data) =>{
        return axios.post(`${API_ROOT}/storeTlist`, data, this.headers);
    }

    showTlist = (id) =>{
        return axios.get(`${API_ROOT}/showTlist/${id}`, this.headers);
    }

    updateTlist = (id, data) =>{
        return axios.post(`${API_ROOT}/updateTlist/${id}`, data, this.headers);
    }

    deleteTlist = (id) =>{
        return axios.delete(`${API_ROOT}/deleteTlist/${id}`, this.headers);
    }

    completeTlist = (id, data) =>{
        return axios.post(`${API_ROOT}/completeTlist/${id}`, data, this.headers);
    }

    rejectTlist = (id, data) =>{
        return axios.post(`${API_ROOT}/rejectTlist/${id}`, data, this.headers);
    }

    cancelTlist = (id, data) =>{
        return axios.post(`${API_ROOT}/cancelTlist/${id}`, data, this.headers);
    }
}