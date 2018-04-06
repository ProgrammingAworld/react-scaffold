/**
 * Created by Anchao on 2017/6/29.
 */

// 公共js
import $ from 'jquery'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import pathToRegExp from 'path-to-regexp'
import { combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ServiceBase from 'base/ServiceBase'
import {
    createAction,
    handleAction, handleActions as originalHandleActions,
    combineActions
} from 'redux-actions'
import createHistory from 'history/createHashHistory'
import {
    NavLink,
    Link,
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom'
import { createSelector } from 'reselect'
import { AppContainer, hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import pMinDelay from 'p-min-delay'
import Tools from './Tools'

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap)
    const fnsMap = {}
    eventNames.forEach((eventName) => {
        const configOrFn = actionMap[eventName]
        if (typeof configOrFn !== 'function') {
            const config = { method: 'GET', ...configOrFn }
            fnsMap[eventName] = settings => (dispatch) => {
                const loading = require('loading').default
                const dialog = require('dialog').default
                
                if ((configOrFn.hasLoading || configOrFn.hasLoading === undefined) && !loading.getLoadingStatus()) loading.show()
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
                    dialog.alert({
                        title: '提醒',
                        content: <div>服务器端错误<span role="img" aria-label="cry">😂</span>！</div>,
                        infoType: 'error',
                    })
                }).always(() => {
                    dispatch(createAction(`${configOrFn.actionType}_ALWAYS`)())
                    loading.hide()
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

const noop = function () {}

export {
    $,
    axios,
    Tools,
    React,
    ReactDOM,
    PropTypes,
    Immutable,
    pathToRegExp,
    combineReducers,
    createAction,
    createActions,
    handleAction,
    handleActions,
    originalHandleActions,
    combineActions,
    Provider,
    connect,
    createSelector,
    Router,
    Route,
    withRouter,
    NavLink,
    Link,
    Redirect,
    Switch,
    createHistory,
    AppContainer,
    hot,
    loadable,
    pMinDelay,
    noop
}
