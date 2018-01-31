/**
 * Created by anchao on 2016/6/29.
 */
import { createAction } from 'common/Util'
import * as actionTypes from './actionTypes'
import TodoService from '../service/TodoService'

export const setAllTodo = createAction(actionTypes.SET_ALL_TODO)
export const addTodo = createAction(actionTypes.ADD_TODO)
export const removeTodo = createAction(actionTypes.REMOVE_TODO)
export const completedTodo = createAction(actionTypes.COMPLETED_TODO)
export const updateTodo = createAction(actionTypes.UPDATE_TODO)
export const checkedAllTodo = createAction(actionTypes.CHECKED_ALL_TODO)
export const setFilter = createAction(actionTypes.SET_VISIBILITY_FILTER)
export const clearCompletedTodo = createAction(actionTypes.CLEAR_COMPLETED_TODO)
export const getAllTodo = () => () => (TodoService.getAllTodo())
