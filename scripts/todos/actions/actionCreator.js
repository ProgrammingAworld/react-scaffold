/**
 * Created by anchao on 2016/6/29.
 */
import * as actionTypes from './actionTypes'
import TodoService from '../service/TodoService'

const actionCreator = {
  getAllTodo: function (fnCb = () => {}) {
    return dispatch => {
      TodoService.getAllTodo().done(oData => {
        if (oData.statusCode === 200) {
          dispatch(this.setAllTodo(oData.list))
        } else {
          fnCb(false, oData.message)
        }
      })
    }
  },
  setAllTodo: function (todos) {
    return {
      type: actionTypes.SET_ALL_TODO,
      todos
    }
  },
  addTodo: function (text) {
    return {
      type: actionTypes.ADD_TODO,
      text
    }
  },
  removeTodo: function (index) {
    return {
      type: actionTypes.REMOVE_TODO,
      index
    }
  },
  completedTodo: function (index) {
    return {
      type: actionTypes.COMPLETED_TODO,
      index
    }
  },
  updateTodo: function (index, text) {
    return {
      type: actionTypes.UPDATE_TODO,
      index,
      text
    }
  },
  checkedAllTodo: function (checked) {
    return {
      type: actionTypes.CHECKED_ALL_TODO,
      checked: checked
    }
  },
  setFilter: function (filter) {
    return {
      type: actionTypes.SET_VISIBILITY_FILTER,
      filter
    }
  },
  clearCompletedTodo: function () {
    return {
      type: actionTypes.CLEAR_COMPLETED_TODO
    }
  }
}

export default actionCreator
