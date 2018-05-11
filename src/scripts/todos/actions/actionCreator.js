/**
 * Created by anchao on 2016/6/29.
 */
import { createAction, createActions } from 'framework'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    getAllTodo: {
        url: '/api/getTodos',
        method: 'GET',
        hasLoading: true,
        actionType: actionTypes.GET_ALL_TODO
    },
    addTodo: createAction(actionTypes.ADD_TODO),
    removeTodo: createAction(actionTypes.REMOVE_TODO),
    updateTodo: createAction(actionTypes.UPDATE_TODO),
    checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO),
    setFilter: createAction(actionTypes.SET_VISIBILITY_FILTER),
    clearCompletedTodo: createAction(actionTypes.CLEAR_COMPLETED_TODO)
})

export default actionCreator
