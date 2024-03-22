import { API_ROOT } from '../core/constant';
import axios from 'axios';

export default class ServiceConfig {
    static instance = ServiceConfig.instance || new ServiceConfig();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };

    listColor = () =>{
        return axios.get(`${API_ROOT}/listColor`, this.headers);
    }

    hexcodeById = (id) =>{
        return axios.get(`${API_ROOT}/hexcodeById/${id}`, this.headers);
    }

    listIcon = () =>{
        return axios.get(`${API_ROOT}/listIcon`, this.headers);
    }

    listIconByCate = () =>{
        return axios.get(`${API_ROOT}/listIconByCate`, this.headers);
    }

    wconstants = () =>{
        return axios.get(`${API_ROOT}/wconstants`, this.headers);
    }

    wreferences = () =>{
        return axios.get(`${API_ROOT}/wreferences`, this.headers);
    }
}