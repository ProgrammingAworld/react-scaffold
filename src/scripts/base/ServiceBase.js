/**
 * Created by anchao on 2016/6/29.
 */
import { $ } from 'common/Util'

/* eslint-disable no-undef */
const host = domain

/* eslint-enable */
export default class ServiceBase {
    /**
   * POST请求统一接口
   * @param url{string}请求的地址
   * @param oSettings{JSON}具体参数
   * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
   */
    static postWithParameter(url, oSettings) {
        const settings = {
            method: 'POST',
            data: $.extend({}, oSettings, { timestamp: Date.now() }),
            // contentType: 'application/json;charset=UTF-8',
            dataType: 'json'
        }
        return $.ajax(`${host}${url}`, settings)
    }

    static getWithParameter(url, oSettings) {
        if (oSettings) {
            return $.get(`${host}${url}`, oSettings)
        }
        return $.get(`${host}${url}`)
    }

    // ---------------------------------------跨域&restful--------------------------
    // static defaultUrl = 'http://xxx.com';
    // static defaultSettings = {
    //   method: "GET",
    //   contentType: 'application/json;charset=utf-8',
    //   data: JSON.stringify({}),
    //   dataType: 'json'
    // };
    //
    // /**
    //  * s请求统一接口
    //  * @param url{string}请求的地址
    //  * @param oSettings{JSON}具体参数
    //  * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
    //  */
    // static handleWithParameter (url, {method = 'GET', data = {}}) {
    //   url = this.defaultUrl + url
    //
    //   if (method.toUpperCase() == 'GET') {
    //     let query = []
    //     for (var key in data) {
    //       query.push(`${key+'='+data[key]}`);
    //     }
    //
    //     return $.get(`${url}${query.length>0 ? '?' + query.join('&') : ''}`)
    //   }
    //
    //   let settings = {...this.defaultSettings,method,data:JSON.stringify({...data})};
    //   return $.ajax(url, settings)
    // }
    //
    // /**
    //  * 获取数据
    //  * @param url
    //  * @param oSettings
    //  * @returns {*|V}
    //  */
    // static getWithParameter(url,oSettings={}){
    //   url = this.defaultUrl + url;
    //   let query = [];
    //
    //   for (var key in oSettings) {
    //     query.push(`${key+'='+oSettings[key]}`);
    //   }
    //
    //   return $.get(`${url}${query.length>0 ? '?' + query.join('&') : ''}`);
    // }
    //
    // /**
    //  * 增加数据
    //  * @param url
    //  * @param oSettings
    //  * @returns {*}
    //  */
    // static postWithParameter(url,oSettings={}){
    //   url = this.defaultUrl+url;
    //   oSettings = {suffixUrl:[],data:{},...oSettings};
    //
    //   //oSettings里有url,则需要拼接到url中
    //   if(oSettings.suffixUrl.length>0){
    //     url = url + '?' +oSettings.suffixUrl.join('&');
    //   }
    //
    //   let settings = {...this.defaultSettings,method:'POST',data:JSON.stringify({data:oSettings.data})};
    //   return $.ajax(url, settings)
    // }
    //
    // /**
    //  * 修改数据
    //  * @param url
    //  * @param oSettings
    //  * @returns {*}
    //  */
    // static putWithParameter(url,oSettings={}){
    //   url = this.defaultUrl+url;
    //   oSettings = {suffixUrl:[],data:{},...oSettings};
    //
    //   //oSettings里有url,则需要拼接到url中
    //   if(oSettings.suffixUrl.length>0){
    //     url = url + '/' +oSettings.suffixUrl.join('/');
    //   }
    //
    //   let settings = {...this.defaultSettings,method:'PUT',data:JSON.stringify({data:oSettings.data})};
    //   return $.ajax(url, settings)
    // }
    //
    // /**
    //  * 删除数据
    //  * @param url
    //  * @param oSettings
    //  */
    // static deleteWithParameter(url,oSettings={}){
    //   url = this.defaultUrl+url;
    //   oSettings = {suffixUrl:[],data:{},...oSettings};
    //
    //   //oSettings里有url,则需要拼接到url中
    //   if(oSettings.suffixUrl.length>0){
    //     url = url + '/' +oSettings.suffixUrl.join('/');
    //   }
    //
    //   let settings = {...this.defaultSettings,method:'DELETE',data:JSON.stringify({data:oSettings.data})};
    //   return $.ajax(url, settings)
    // }
}
