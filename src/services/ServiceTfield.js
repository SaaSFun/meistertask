import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceTfield {
    static instance = ServiceTfield.instance || new ServiceTfield();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };
    
    storeTfield = (data) =>{
        return axios.post(`${API_ROOT}/storeTfield`, data, this.headers);
    }

    updateTfield = (id, data) =>{
        return axios.post(`${API_ROOT}/updateTfield/${id}`, data, this.headers);
    }

    deleteTfield = (id) =>{
        return axios.delete(`${API_ROOT}/deleteTfield/${id}`, this.headers);
    }
}