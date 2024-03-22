import { API_ROOT } from '../core/constant';
import axios from 'axios';
import Util from '../core/util';

export default class ServiceFile {
    static instance = ServiceFile.instance || new ServiceFile();
    access_token = JSON.parse(localStorage.getItem('access_token'));
    username = JSON.parse(localStorage.getItem('username'));
    hashtoken = JSON.parse(localStorage.getItem('hashtoken'));
    verify_code = JSON.parse(localStorage.getItem('verify_code'));
    fe_domain = JSON.parse(localStorage.getItem('fe_domain'));
    headers = { headers: { "Authorization": `${this.access_token}`, "Verify-Code": `${this.verify_code}`, "Fedomain": `${this.fe_domain}`, "Username": `${this.username}` } };
    util = new Util();
    
    uploadavatar = (data, files) =>{
        let form_data = this.util.jsonToFormData(data);
        Object.values(files).forEach(function(file, index) {
            form_data.append(`files[${index}]`, file);
        });
        return axios.post(`${API_ROOT}/uploadavatar`, form_data, this.headers);
    }
    
    uploadTfile = (uid, files) =>{
        let form_data = new FormData();;
        Object.values(files).forEach(function(file, index) {
            form_data.append(`files[${index}]`, file);
        });
        return axios.post(`${API_ROOT}/uploadTfile/${uid}`, form_data, this.headers);
    }

    deleteTfile = (id) =>{
        return axios.delete(`${API_ROOT}/deleteTfile/${id}`, this.headers);
    }
}