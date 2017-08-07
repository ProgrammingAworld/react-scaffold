/**
 * Created by anchao on 2016/7/26.
 */
import {loginReducer} from '../login/reducers/reducers'
import {TodosReducers} from '../todos/reducers/reducers'
import 'babel-polyfill'

// 每个模块单独一个对象整理
// 登录模块，todos
export const reducers = {...loginReducer, ...TodosReducers}
