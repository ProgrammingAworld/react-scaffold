/**
 * Created by Anchao on 2015/11/10.
 */

//公共js
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import Tools from './Tools';

window.$ = window.jQuery = $;
window._ = _;
window.Backbone = Backbone;
window.dialog = require('../plugins/dialog');
window.React = React;
window.ReactDOM = ReactDOM;
window.Rx = Rx;
window.Tools = Tools;
window.router = null;