/**
 * Created by anchao on 2016/7/26.
 */
import {loginReducer} from '../login/reducers/reducers';
import {homeReducer} from '../home/reducers/reducers';
import {applictionReducer} from '../application/reducers/reducers';
import {retrievalReducer} from '../retrieval/reducers/reducers';
import {judgedReducer} from '../judged/reducers/reducers';
import {archivesReducer} from '../archives/reducers/reducers';
import {cooperationReducer} from '../cooperation/reducers/reducers';
import {todosReducers} from '../todos/reducers/reducers';

//每个模块单独一个对象整理
//登录模块
//首页
//应用
//检索
//研判
//档案
//协作
//todos

export const reducers = Object.assign({}, loginReducer, homeReducer, applictionReducer, retrievalReducer, judgedReducer, archivesReducer, cooperationReducer, todosReducers);