import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceWstep {
    static instance = ServiceWstep.instance || new ServiceWstep();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingWstep = (data) =>{
        return axios.post(`${API_ROOT}/pagingWstep`, data, this.headers);
    }
    
    storeWstep = (data) =>{
        return axios.post(`${API_ROOT}/storeWstep`, data, this.headers);
    }

    updateWstep = (id, data) =>{
        return axios.post(`${API_ROOT}/updateWstep/${id}`, data, this.headers);
    }

    deleteWstep = (id) =>{
        return axios.delete(`${API_ROOT}/deleteWstep/${id}`, this.headers);
    }
}