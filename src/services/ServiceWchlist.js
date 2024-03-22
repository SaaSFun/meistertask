import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceWchlist {
    static instance = ServiceWchlist.instance || new ServiceWchlist();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingWchlist = (data) =>{
        return axios.post(`${API_ROOT}/pagingWchlist`, data, this.headers);
    }
    
    storeWchlist = (data) =>{
        return axios.post(`${API_ROOT}/storeWchlist`, data, this.headers);
    }

    updateWchlist = (id, data) =>{
        return axios.post(`${API_ROOT}/updateWchlist/${id}`, data, this.headers);
    }

    deleteWchlist = (id) =>{
        return axios.delete(`${API_ROOT}/deleteWchlist/${id}`, this.headers);
    }
}