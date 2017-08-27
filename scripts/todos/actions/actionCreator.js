/**
 * Created by anchao on 2016/6/29.
 */
import {Tools} from '../../common/Util'
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
  setAllTodo: Tools.makeActionCreator(actionTypes.SET_ALL_TODO, 'todos'),
  addTodo: Tools.makeActionCreator(actionTypes.ADD_TODO, 'text'),
  removeTodo: Tools.makeActionCreator(actionTypes.REMOVE_TODO, 'index'),
  completedTodo: Tools.makeActionCreator(actionTypes.COMPLETED_TODO, 'index'),
  updateTodo: Tools.makeActionCreator(actionTypes.UPDATE_TODO, 'index', 'text'),
  checkedAllTodo: Tools.makeActionCreator(actionTypes.CHECKED_ALL_TODO, 'checked'),
  setFilter: Tools.makeActionCreator(actionTypes.SET_VISIBILITY_FILTER, 'filter'),
  clearCompletedTodo: Tools.makeActionCreator(actionTypes.CLEAR_COMPLETED_TODO)
}

export default actionCreator
