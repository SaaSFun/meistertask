import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceTtime {
    static instance = ServiceTtime.instance || new ServiceTtime();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    checkinTime = (id, data = {}) =>{
        return axios.post(`${API_ROOT}/checkinTime/${id}`, data, this.headers);
    }
    
    checkoutTime = (id, data = {}) =>{
        return axios.post(`${API_ROOT}/checkoutTime/${id}`, data, this.headers);
    }

    removeTime = (id) =>{
        return axios.delete(`${API_ROOT}/removeTime/${id}`, this.headers);
    }
}