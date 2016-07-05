/**
 * Created by anchao on 2016/6/29.
 */

export default class BaseAPI{
    /**
     * POST请求统一接口
     * @param url{string}请求的地址
     * @param oSettings{JSON}具体参数
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static postWithParameter(url,oSettings){
        let settings = {
            method: 'POST',
            data: JSON.stringify(oSettings),
            contentType: 'application/json',
            dataType: 'json'
        };

        return $.ajax(url, settings);
    }
}