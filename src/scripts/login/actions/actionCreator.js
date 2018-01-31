/**
 * Created by anchao on 2016/7/26.
 */
import { createAction } from 'common/Util'
import * as actionTypes from './actionTypes'
import LoginService from '../service/LoginService'

export const setUserType = createAction(actionTypes.SET_USER_TYPE)
export const setUserName = createAction(actionTypes.SET_USERNAME)
export const setError = createAction(actionTypes.SET_ERROR)
export const login = (username, password, type = '0') => () =>
    LoginService.login({ username, password, type })
export const KPIlogin = (username, password, type = '0') => () =>
    LoginService.PKIlogin({ username, password, type })
export const logout = () => () => (LoginService.logout())
export const checkAuthority = () => () => (LoginService.checkAuthority())
