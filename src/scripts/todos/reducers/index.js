/**
 * Created by anchao on 2016/6/30.
 */
import { combineReducers } from 'common/Util'
import todoList from './todoList'
import todoFilter from './todoFilter'

export default combineReducers({
    todoFilter,
    todoList
})
