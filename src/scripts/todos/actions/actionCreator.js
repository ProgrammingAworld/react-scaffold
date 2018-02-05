/**
 * Created by anchao on 2016/6/29.
 */
import { createAction, createActions } from 'common/Util'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    getAllTodo: {
        url: '/todos/getAll',
        method: 'GET',
        actionType: actionTypes.GET_ALL_TODO,
    },
    setAllTodo: createAction(actionTypes.SET_ALL_TODO),
    addTodo: createAction(actionTypes.ADD_TODO),
    removeTodo: createAction(actionTypes.REMOVE_TODO),
    completedTodo: createAction(actionTypes.COMPLETED_TODO),
    updateTodo: createAction(actionTypes.UPDATE_TODO),
    checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO),
    setFilter: createAction(actionTypes.SET_VISIBILITY_FILTER),
    clearCompletedTodo: createAction(actionTypes.CLEAR_COMPLETED_TODO)
})

export default actionCreator
