/**
 * Created by anchao on 2016/6/2.
 */

import ProjectAction from '../action/ProjectAction';

export default class QueueController{
    static getData(){
        return this.aData == null?[]:this.aData;
    }

    static setData(aData){
        this.aData = aData;
    }

    static getAll(fnCb){
        let isSuccess = false;
        ProjectAction.getAllQueue().done(function (oRes) {
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

    static add(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.add(oSettings)
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

    static deleteFromQueue(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.deleteFromQueue(oSettings)
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    let aNew = this.getData().map(function (item) {
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

    static deleteFromQueue(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.deleteFromQueue(oSettings)
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

    static adjust(oSettings,fnCb){
        let isSuccess = false;
        ProjectAction.adjust(oSettings)
            .done(function (oRes) {
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

    static run(oSettings){
        ProjectAction.run(oSettings);
    }

    static pause(oSettings){
        ProjectAction.pause(oSettings);
    }

    static getStatus(fnCb){
        let isSuccess = false;
        let status = false;
        ProjectAction.getStatus()
            .done(function (oRes) {
                isSuccess = oRes.success;
                if(isSuccess){
                    status = oRes.result;
                }
            }.bind(this))
            .always(function () {
                if(isSuccess){
                    fnCb(status);
                }
            });
    }
}