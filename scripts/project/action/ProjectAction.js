/**
 * Created by anchao on 2016/5/26.
 */

import BaseAction from '../../Base/BaseAPI';

export default class ProjectAction extends BaseAction{
    /**
     * 得到所有版本
     * @returns {success:true|false,result:[]|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static getAll(){
        return $.get('/bus/version/getAll');
    }

    /**
     * 根据version id获得version对象
     * @param oSettings{id{string}}
     *        id:version的id
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *          返回version对象
     */
    static get(oSettings){
        return $.get('/bus/version/get',oSettings);
    }

    /**
     * 创建一个版本
     * @param oSettings{name:{string},version:{string}}
     *        name:版本名称
     *        version:版本号
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *        返回version对象
     */
    static create(oSettings){
        return this.postWithParameter('/bus/version/create',oSettings);
    }

    /**
     * 删除一个版本
     * @param oSettings{id:{string}}
     *        id:版本id
     * @returns {success:true|false,result:true|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static delete(oSettings){
        return this.postWithParameter('/bus/version/delete',oSettings);
    }

    /**
     * 删除一个name下的所有版本
     * @param oSettings{id:{string}}
     *        name:版本name
     * @returns {success:true|false,result:true|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static deleteAll(oSettings){
        return this.postWithParameter('/bus/version/deleteAll',oSettings);
    }

    /**
     * 修改版本名称
     * @param oSettings{name:{string},new_name:{string}}
     *        name:版本的原名称
     *        newName:版本新名称
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *         返回当前版本的对象
     */
    static modifyName(oSettings){
        return this.postWithParameter('/bus/version/modifyName',oSettings);
    }

    /**
     * 修改版本号
     * @param oSettings{id:{string},new_version:{string}}
     *        id:版本的id
     *        version:新版本号
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *          返回当前版本的对象
     */
    static modifyVersion(oSettings){
        return this.postWithParameter('/bus/version/modifyVersion',oSettings);
    }

    /**
     * 修改版本的meta
     * @param oSettings{id:{string},meta:{}}
     *        id:版本的id
     *        meta:新meta信息
     *        status:Option[String]可选
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *        返回当前版本的对象
     *
     */
    static modifyMeta(oSettings){
        return this.postWithParameter('/bus/version/modifyMeta',oSettings);
    }

    /**
     * 另存为一个版本
     * @param oSettings{id:{string},newName:{string},newVersion:{string}}
     *        id:版本的id
     *        newName:新版本名称
     *        newVersion:新版本号
     * @returns {success:true|false,result:{}|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *        返回当前版本的对象
     */
    static saveAs(oSettings){
        return this.postWithParameter('/bus/version/saveAs',oSettings);
    }

    /**
     * 得到全局运行队列
     * @returns {success:true|false,result:[]|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static getAllQueue(){
        return $.get('/bus/runQueue/getAll');
    }

    /**
     * 向全局队列增加一个任务
     * @param oSettings{id:{string}}
     *        id:id
     * @returns {success:true|false,result:true|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *        返回全局队列是否运行的状态
     */
    static add(oSettings){
        return this.postWithParameter('/bus/runQueue/add',oSettings);
    }

    /**
     * 队列中调整顺序
     * @param oSettings{id:{string},from:{Number},to:{Number}}
     *        id:版本的id
     *        from:移动元素原来在数组中的索引
     *        to:移动到数组后的新索引
     * @returns {success:true|false,result:[]|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     *         返回队列数组
     */
    static adjust(oSettings){
        return this.postWithParameter('/bus/runQueue/adjust',oSettings);
    }

    /**
     * 全局队列中删除一个任务
     * @param oSettings{id:{string}}
     *        id:版本的id
     * @returns {success:true|false,result:true|{error:{anchor: "",code: 0,msg: "",scope: ""}}}
     */
    static deleteFromQueue(oSettings){
        return this.postWithParameter('/bus/runQueue/delete',oSettings);
    }

    /**
     * 运行全局队列
     */
    static run(){
        return this.postWithParameter('/bus/runQueue/run');
    }

    /**
     * 暂停全局队列
     */
    static pause(){
        return this.postWithParameter('/bus/runQueue/pause');
    }

    /**
     * 获得全局队列状态
     */
    static getStatus(){
        return $.get('/bus/runQueue/getStatus');
    }
}