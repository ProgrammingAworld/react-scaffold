/**
 * Created by anchao on 2016/6/2.
 */

import ProjectAction from '../action/ProjectAction';

export default class VersionsController{
    static getData(){
        return this.aData == null?[]:this.aData;
    }

    static setData(aData){
        this.aData = aData;
    }

    static getAll(fnCb){
        let isSuccess = false;
        ProjectAction.getAll().done(function (oRes) {
            isSuccess = oRes.success;
            if(isSuccess){
                this.setData(oRes.result);
            }
        }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static getById(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.get(oSettings)
            .done(function (oRes) {
                isSuccess =  oRes.success;
                if(isSuccess){
                    let aNew = this.getData().map(function (item,index) {
                        if(item.id==oSettings.id){
                           $.extend(item,oRes.result);
                        }

                        return item;
                    });

                    this.setData(aNew);
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static create(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.create(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    let aNew = [oRes.result].concat(this.getData());
                    this.setData(aNew);
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static deleteAll(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.deleteAll(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    let aNew = this.getData().filter(function (item,index) {
                        return item.name != oSettings.name;
                    });
                    
                    this.setData(aNew);
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static delete(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.delete(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    let aNew = this.getData().filter(function (item,index) {
                        return item.id != oSettings.id;
                    });

                    this.setData(aNew);
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static modifyName(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.modifyName(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                this.getAll(fnCb);
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static modifyVersion(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.modifyVersion(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                this.getAll(fnCb);
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static modifyMeta(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.modifyMeta(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }

    static saveAs(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.saveAs(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    this.getAll(fnCb);
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb();
                }
            });
    }
}