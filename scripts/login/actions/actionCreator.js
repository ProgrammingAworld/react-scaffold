/**
 * Created by anchao on 2016/7/26.
 */

import {Tools, dialog} from '../../common/Util';
import * as actionTypes from './actionTypes';
import LoginService from '../service/LoginService';

const actionCreator = {
    login: function (username, password, type = "0", fnCb) {
        let that = this;
        return dispatch=> {
            LoginService.login({username: username, password, type: type}).done(oData=> {
                if (oData.statusCode == 200) {
                    Tools.exeCb(fnCb);
                } else {
                    dispatch(this.setError(oData.message));
                }
            });

            // Tools.exeCb(fnCb);
        }
    },
    logout: function (fnCb) {
        return dispatch=> {
            LoginService.logout().done(oData=> {
                if (oData.statusCode == 200) {
                    Tools.exeCb(fnCb);
                } else {
                    dialog.alert(oData.message);
                }
            });
        }
    },
    PKIlogin: function () {
        return dispatch=> {
            LoginService.PKIlogin().done(function () {
                location.href = "console.html";
            })
        }
    },
    checkAuthority: function (fnCb) {
        return dispatch=> {
            LoginService.checkAuthority().done(oData=> {
                if (oData.statusCode != 200) {
                    Tools.exeCb(fnCb);
                } else {
                    fnCb(oData.obj);
                }
            });
        };
    },
    setUserType: function (userType) {
        return {
            type: actionTypes.SET_USER_TYPE,
            userType
        }
    },
    setUserName: function (username) {
        return {
            type: actionTypes.SET_USERNAME,
            username
        }
    },
    setError: function (msg) {
        return {
            type: actionTypes.SET_ERROR,
            msg
        }
    }
};
export default actionCreator;