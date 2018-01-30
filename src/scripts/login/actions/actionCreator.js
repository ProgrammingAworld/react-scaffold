/**
 * Created by anchao on 2016/7/26.
 */
import { createAction } from 'common/Util'
import * as actionTypes from './actionTypes'
import LoginService from '../service/LoginService'

const actionCreator = {
    login(username, password, type = '0', fnCb) {
        return () => {
            LoginService.login({ username, password, type })
                .done((oData) => {
                    if (oData.statusCode === 200) {
                        fnCb(true)
                    } else {
                        fnCb(false, oData.message)
                    }
                })
        }
    },
    logout(fnCb) {
        return () => {
            LoginService.logout().done((oData) => {
                if (oData.statusCode === 200) {
                    fnCb(true)
                } else {
                    fnCb(false, oData.message)
                }
            })
        }
    },
    PKIlogin(fnCb) {
        return () => {
            LoginService.PKIlogin().done(() => {
                fnCb(true)
            })
        }
    },
    checkAuthority(fnCb) {
        return () => {
            LoginService.checkAuthority().done((oData) => {
                if (oData.statusCode !== 200) {
                    fnCb(true)
                } else {
                    fnCb(false, oData.obj)
                }
            })
        }
    },
    setUserType: createAction(actionTypes.SET_USER_TYPE),
    setUserName: createAction(actionTypes.SET_USERNAME),
    setError: createAction(actionTypes.SET_ERROR)
}

export default actionCreator
