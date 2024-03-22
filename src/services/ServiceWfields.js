import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceWfields {
    static instance = ServiceWfields.instance || new ServiceWfields();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingWfields = (data) =>{
        return axios.post(`${API_ROOT}/pagingWfields`, data, this.headers);
    }
    
    storeWfields = (data) =>{
        return axios.post(`${API_ROOT}/storeWfields`, data, this.headers);
    }

    updateWfields = (id, data) =>{
        return axios.post(`${API_ROOT}/updateWfields/${id}`, data, this.headers);
    }

    deleteWfields = (id) =>{
        return axios.delete(`${API_ROOT}/deleteWfields/${id}`, this.headers);
    }
}