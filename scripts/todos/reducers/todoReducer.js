/**
 * Created by anchao on 2016/6/30.
 */
import {Immutable} from '../../common/Util'
import * as actionTypes from '../actions/actionTypes'
export const todoReducer = (state = Immutable.fromJS([]), action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_TODO:
      return Immutable.fromJS(action.todos)
    case actionTypes.GET_ALL_TODO:
      return state
    case actionTypes.ADD_TODO:
      return state.unshift(Immutable.fromJS({text: action.text, completed: false}))
    case actionTypes.REMOVE_TODO:
      return state.splice(action.index, 1)
    case actionTypes.COMPLETED_TODO:
      let oTodo = state.get(action.index)
      return state.setIn([action.index, 'completed'], !oTodo.get('completed'))
    case actionTypes.UPDATE_TODO:
      return state.setIn([action.index, 'text'], action.text)
    case actionTypes.CHECKED_ALL_TODO:
      return state.map(oTodo => {
        return oTodo.set('completed', action.checked)
      })
    case actionTypes.CLEAR_COMPLETED_TODO:
      return state.filter(oTodo => {
        if (!oTodo.get('completed')) {
          return oTodo
        }
      })
    default:
      return state
  }
}
