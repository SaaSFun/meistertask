import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceUser {
    static instance = ServiceUser.instance || new ServiceUser();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    pagingUser = (data) =>{
        return axios.post(`${API_ROOT}/pagingUser`, data, this.headers);
    }

    getLinkedUser = (data) =>{
        return axios.post(`${API_ROOT}/getLinkedUser`, data, this.headers);
    }
    
    storeUser = (data) =>{
        return axios.post(`${API_ROOT}/storeUser`, data, this.headers);
    }

    updateUser = (uid, data) =>{
        return axios.post(`${API_ROOT}/updateUser/${uid}`, data, this.headers);
    }

    deleteUser = (uid) =>{
        return axios.delete(`${API_ROOT}/deleteUser/${uid}`, {}, this.headers);
    }
    
    assignWmber = (data) =>{
        return axios.post(`${API_ROOT}/assignWmber`, data, this.headers);
    }
    
    removeWmber = (data) =>{
        return axios.post(`${API_ROOT}/removeWmber`, data, this.headers);
    }
    
    deleteUser = (uid) =>{
        return axios.delete(`${API_ROOT}/deleteUser/${uid}`, this.headers);
    }
}