/**
 * Created by Anchao on 2017/6/29.
 */

// 公共js
import $ from 'jquery'
import dialog from '../plugins/dialog'
import Tools from './Tools'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import createHistory from 'history/createHashHistory'
import { NavLink, Link, HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createSelector } from 'reselect'
require('../plugins/bootstrap')

// state日志
const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {}

    for (var i of Object.keys(state)) {
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
const storeCreateByReducer = reducers => {
  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware, logger)
  )
}

export {
  $,
  dialog,
  Tools,
  React,
  ReactDOM,
  PropTypes,
  PureRenderMixin,
  Immutable,
  storeCreateByReducer,
  combineReducers,
  Provider,
  connect,
  createSelector,
  Router,
  Route,
  NavLink,
  Link,
  Redirect,
  createHistory
}
