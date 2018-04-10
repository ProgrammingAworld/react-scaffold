/**
 * Created by anchao on 2016/7/26.
 */
import { createAction, createActions } from 'common/Util'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    login: {
        url: '/api/login',
        actionType: actionTypes.LOGIN
    },
    KPIlogin: {
        url: '/api/loginPKI',
        actionType: actionTypes.KPI_LOGIN
    },
    logout: {
        url: '/api/logout',
        actionType: actionTypes.LOGOUT
    },
    setUserType: createAction(actionTypes.SET_USER_TYPE),
    setUserName: createAction(actionTypes.SET_USERNAME),
    setError: createAction(actionTypes.SET_ERROR)
})

export default actionCreator
