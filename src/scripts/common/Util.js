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
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import createHistory from 'history/createHashHistory'
import {
    NavLink, Link, HashRouter as Router, Route, Redirect, Switch, withRouter
} from 'react-router-dom'
import { routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createSelector } from 'reselect'
import { AppContainer } from 'react-hot-loader'
import {
    createAction,
    handleAction, handleActions as originalHandleActions,
    combineActions
} from 'redux-actions'
import ServiceBase from '../base/ServiceBase'
import dialog from '../plugins/dialog'
import Tools from './Tools'
// require('../plugins/bootstrap')

// state日志
const logger = createLogger({
    stateTransformer: (state) => {
        const newState = {}

        for (const i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS()
            } else {
                newState[i] = state[i]
            }
        }

        return newState
    }
})

// store创建工具
const storeCreateByReducer = reducers => createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware, logger)
)

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap)
    const fnsMap = {}
    eventNames.forEach((eventName) => {
        const configOrFn = actionMap[eventName]
        if (typeof configOrFn !== 'function') {
            const config = { method: 'GET', ...configOrFn }
            fnsMap[eventName] = settings => (dispatch) => {
                dispatch(createAction(`${configOrFn.actionType}_PRE`)())

                return ServiceBase[`${config.method.toLowerCase()}WithParameter`](
                    config.url,
                    settings
                ).done((res) => {
                    if (res.statusCode === 200) {
                        dispatch(createAction(`${configOrFn.actionType}_SUCCESS`)(res.data))
                    } else {
                        dispatch(createAction(`${configOrFn.actionType}_SUCCESS`)(res.message))
                    }
                }).fail(() => {
                    dispatch(createAction(`${configOrFn.actionType}_ERROR`)())
                }).always(() => {
                    dispatch(createAction(`${configOrFn.actionType}_ALWAYS`)())
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
    $,
    axios,
    dialog,
    Tools,
    React,
    ReactDOM,
    PropTypes,
    Immutable,
    pathToRegExp,
    storeCreateByReducer,
    combineReducers,
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
    createAction,
    createActions,
    handleAction,
    handleActions,
    combineActions
}
