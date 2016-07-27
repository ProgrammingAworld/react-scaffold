/**
 * Created by anchao on 2016/7/26.
 */
import * as actionTypes from './actionTypes';
import LoginService from '../service/LoginService';
import {$} from '../../common/Util';

const actionCreator = {
    login: function (username, password, type = "0",fnCb) {
        return (dispatch,getState)=> {
            // LoginService.login({username:username,password,type:type}).done(oData=> {
            //     if (oData.statusCode == 200) {
            //         // dispatch(this.setAll(oData.list));
            //     }
            // });

            if(fnCb&&typeof fnCb=='function'){
                fnCb();
            }
        }
    },
    PKIlogin: function () {
        return dispatch=> {
            LoginService.PKIlogin().done(function () {
                location.href = "console.html";
            })
        }
    },
    setUserType: function (userType) {
        return {
            type: actionTypes.SET_USER_TYPE,
            userType
        }
    }
};
export default actionCreator;