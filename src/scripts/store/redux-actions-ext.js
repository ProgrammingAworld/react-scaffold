/**
 * 功能：redux-actions扩展
 * 作者：安超
 * 日期： 2018/3/29
 */

import ServiceBase from 'base/ServiceBase'
import {
    createAction,
    handleAction, handleActions as originalHandleActions,
    combineActions
} from 'redux-actions'
import * as actionCreator from 'common/loading/actions/actionCreator'

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap)
    const fnsMap = {}
    eventNames.forEach((eventName) => {
        const configOrFn = actionMap[eventName]
        if (typeof configOrFn !== 'function') {
            const config = { method: 'GET', ...configOrFn }
            fnsMap[eventName] = settings => (dispatch) => {
                if (configOrFn.hasLoading || configOrFn.hasLoading === undefined) dispatch(actionCreator.showLoading())
                dispatch(createAction(`${configOrFn.actionType}_PRE`)())
                return ServiceBase[`${config.method.toLowerCase()}WithParameter`](
                    config.url,
                    settings
                ).done((res) => {
                    if (res.statusCode === 200) {
                        dispatch(createAction(`${configOrFn.actionType}_SUCCESS`)(res.data))
                    } else {
                        dispatch(createAction(`${configOrFn.actionType}_ERROR`)(res.msg))
                    }
                }).fail(() => {
                    dispatch(createAction(`${configOrFn.actionType}_FAIL`)())
                }).always(() => {
                    dispatch(createAction(`${configOrFn.actionType}_ALWAYS`)())
                    dispatch(actionCreator.hideLoading())
                })
            }
        } else {
            fnsMap[eventName] = configOrFn
        }
    })
    
    return fnsMap
}

// 增强handleActions，可以配置{}
const handleActions = function (reducerMap, defaultState) {
    const result = { ...reducerMap }
    Object.keys(result).forEach((actionType) => {
        const fnOrObject = result[actionType]
        if (fnOrObject && typeof fnOrObject !== 'function') {
            Object.keys(fnOrObject).forEach((suffixAction) => {
                result[`${actionType}_${suffixAction.toUpperCase()}`] = fnOrObject[suffixAction]
            })
        }
    })
    
    return originalHandleActions(result, defaultState)
}

export {
    createAction,
    createActions,
    handleAction,
    handleActions,
    combineActions
}
