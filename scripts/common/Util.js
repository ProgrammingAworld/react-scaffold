/**
 * Created by Anchao on 2016/6/29.
 */

//公共js
import $ from 'jquery';
import _ from 'underscore';
import dialog from '../plugins/dialog';
require("../plugins/bootstrap");
import Tools from './Tools';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import loggerCreator from 'redux-logger';
import promise from 'redux-promise';
import {createSelector} from 'reselect';

//state日志
const logger = loggerCreator({
    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        }
        ;

        return newState;
    }
});
//中间件
const middleWare = applyMiddleware(thunkMiddleware, logger);
//store创建工具
const storeCreateByReducer = reducer => {
    return createStore(reducer, middleWare);
};

export {
    $,
    _,
    dialog,
    Tools,
    React,
    ReactDOM,
    Immutable,
    storeCreateByReducer,
    combineReducers,
    Provider,
    connect,
    promise,
    createSelector
};