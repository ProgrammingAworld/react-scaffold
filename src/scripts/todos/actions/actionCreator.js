/**
 * Created by anchao on 2016/6/29.
 */
import { createAction } from 'common/Util'
import * as actionTypes from './actionTypes'
import TodoService from '../service/TodoService'

const actionCreator = {
    getAllTodo(fnCb = () => {}) {
        return () => {
            TodoService.getAllTodo().done((oData) => {
                if (oData.statusCode === 200) {
                    fnCb(true, oData.list)
                } else {
                    fnCb(false, oData.message)
                }
            })
        }
    },
    setAllTodo: createAction(actionTypes.SET_ALL_TODO),
    addTodo: createAction(actionTypes.ADD_TODO),
    removeTodo: createAction(actionTypes.REMOVE_TODO),
    completedTodo: createAction(actionTypes.COMPLETED_TODO),
    updateTodo: createAction(actionTypes.UPDATE_TODO),
    checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO),
    setFilter: createAction(actionTypes.SET_VISIBILITY_FILTER),
    clearCompletedTodo: createAction(actionTypes.CLEAR_COMPLETED_TODO)
}

export default actionCreator
