/**
 * Created by anchao on 2016/6/29.
 */
import {$} from '../common/Util';

export default class ServiceBase{
    /**
     * POST请求统一接口
     * @param url{string}请求的地址
     * @param oSettings{JSON}具体参数
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static postWithParameter(url, oSettings) {
        let settings = {
            method: 'POST',
            data: $.extend({}, oSettings, {timestamp: Date.now()}),
            // contentType: 'application/json;charset=UTF-8',
            dataType: 'json'
        };
        url = scopaConfig.url + url;
        return $.ajax(url, settings);
    }

    static getWithParameter(url, oSettings) {
        url = scopaConfig.url + url;
        if (oSettings) {
            return $.get(url, oSettings);
        } else {
            return $.get(url);
        }
    }
}