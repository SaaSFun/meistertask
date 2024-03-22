import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceAuth {
    static instance = ServiceAuth.instance || new ServiceAuth();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}` } };
    
    login = (data) => {
        return axios.post(`${API_ROOT}/login`, data);
    }

    checklogin = () =>{
        return axios.post(`${API_ROOT}/checklogin`, {username: this.username, hashtoken: this.hashtoken}, this.headers);
    }

    logout = () =>{
        return axios.post(`${API_ROOT}/logout`, {token: this.access_token}, this.headers);
    }
}