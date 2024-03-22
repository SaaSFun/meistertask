// import npm packge
import _ from 'lodash';
import $ from 'jquery';
import * as moment from "moment";
import toast from 'react-hot-toast';
// import service api
//
// import core class
import { DURATION_TOAST } from './constant';
// import com page
//
// import modal tool
//
// import style media
//
// coding
export default class Util {
    /*Static method*/
    static generateTestList = function($env, num, numItems) {
        let _seft = this;
        let entry = { name: 'droppable' + num + 'Items', items: [], index: num };
        const randomSize = () => 50 + Math.floor(Math.random() * Math.floor(250));
        const pseudoRandomSize = i =>
            50 + (((i + 1) * (num + 1)) % 5 === 0 ? 200 : ((i + 1) * (num + 1)) % 4 === 0 ? 150 : ((i + 1) * (num + 1)) % 3 === 0 ? 100 : ((i + 1) * (num + 1)) % 2 === 0 ? 50 : 0);
        let sectionId = 0;
        for (let i = 0; i < numItems; i++) {
            if (i % 3 === 0) {
                sectionId = i;
            }
            entry.items.push({ id: num + '_' + i, name: 'Item ' + num + '-' + i, height: $env.state.lazyLoad ? pseudoRandomSize(i) : randomSize(), sectionId: 'Person ' + sectionId / 3 });
        }
        return entry;
    };
    static indexColorbyId($colors, $id) {
        let $idx = _.findIndex($colors, {
            id: $id
        });
        if ($idx != -1) {
            return $colors[$idx].hexcode;
        }
        return "";
    };
    static indexTagbyId($tags, $id) {
        let $idx = _.findIndex($tags, {
            id: $id
        });
        if ($idx != -1) {
            return $tags[$idx];
        }
        return false;
    };
    static listIconBy($icon, $mode = 'default', $name = 'Default') {
        let lstdefault = _.reject($icon, function(items) {
            return $mode == 'default' || $mode == 'each' ? items.name != $name : items.name == null;
        });
        if (lstdefault.length == 1 && ($mode == 'default' || $mode == 'each')){
            return lstdefault[0].items;
        }
        if ($mode == 'more'){
            return lstdefault;
        }
        return [];
    };
    static getFullname($users, $uid) {
        let _find = _.find($users, { 'uid': $uid});
        if (_find) {
            return _find.fullname;
        }
        return 'N/A';
    };
    static formatDateTime($date, $format = 'YYYY-MM-DD') {
        return moment($date).format($format);
    };
    static toast($msg, $type = 'success', $promise) {
        switch($type){
            case 'success':
                toast.success($msg, { duration: DURATION_TOAST,});
                break;
            case 'error':
                toast.error($msg, { duration: DURATION_TOAST,});
                break;
            case 'warning':
                toast($msg, { duration: DURATION_TOAST, icon: '⚠️',});
                break;
            case 'deny':
                toast($msg, { duration: DURATION_TOAST, icon: '🛇',});
                break;
            case 'promise':
                toast.promise(
                    $promise,
                    {
                        loading: $msg.loading,
                        success: $msg.success,
                        error: $msg.error,
                        duration: DURATION_TOAST
                    },
                );
                break;
        }
    };
    static hex2Rgb = (hex, opa = 100) => {
        const rgbChar = ['r', 'g', 'b', 'rgb'];
        const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (normal) {
            return normal.slice(1).reduce((a, e, i) => {
                a[rgbChar[i]] = parseInt(e, 16);
                a['rgb'] = (a['rgb'] != undefined ? a['rgb'] : "rgb(") + a[rgbChar[i]] + (rgbChar[i] !== "b" ? " " : " / " + opa + "%)");
                return a;
            }, {});
        }
        const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (shorthand) {
            return shorthand.slice(1).reduce((a, e, i) => {
                a[rgbChar[i]] = 0x11 * parseInt(e, 16);
                a['rgb'] = (a['rgb'] != undefined ? a['rgb'] : "rgb(") + a[rgbChar[i]] + (rgbChar[i] !== "b" ? " " : " / " + opa + "%)");
                return a;
            }, {});
        }
        return null;
    }
    static renderNumberPlus = (num) => {
        let number = num ? num : 0;
        return String(number).length > 2 ? '99+' : String(number);
    }
    static calulateTime = ($range = []) => {
        let tracking = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        _.forEach($range, function(time, i){
            let remain = 0;
            if (!time.end_time) {
                remain = moment() - moment(time.start_time);
            } else {
                remain = moment(time.end_time) - moment(time.start_time);
            }
            tracking += remain;
        });
        return [Math.ceil(tracking/1000), $range.length && !$range[$range.length - 1].end_time ? true : false];
    }
    /*Public method*/
    ////////
    buildFormData = function(formData, data, parentKey = '') {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    };
    jsonToFormData = function(data) {
        let formData = new FormData();
        this.buildFormData(formData, data);
        return formData;
    };
    handleResizeImage = async function(e, MAX_WIDTH = 300, MAX_HEIGHT = 300) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = document.createElement("img");
            img.onload = () => {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL("image/png");
                return this.dataURLtoFile(dataurl, file.name);
            }
            img.src = e.target.result;
        }
        await reader.readAsDataURL(file);
    };
    dataURLtoFile = function(dataurl, filename) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type:mime});
    };
}