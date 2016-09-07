/**
 * Created by Anchao on 2016/6/29.
 */

//模块js
import Main from './main/Main';
import {config} from './common/config';

window.scopaConfig = {
    "url": "/",
    "errors": config.errors
};

new Main().init();