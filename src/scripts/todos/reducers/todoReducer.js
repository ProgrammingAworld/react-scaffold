/**
 * Created by anchao on 2016/6/30.
 */
import { Immutable, Tools } from '../../common/Util'
import * as actionTypes from '../actions/actionTypes'

const todoReducer = Tools.createReducer(Immutable.fromJS([]), {
    [actionTypes.SET_ALL_TODO](state, action) {
        return Immutable.fromJS(action.todos)
    },
    [actionTypes.ADD_TODO](state, action) {
        return state.unshift(Immutable.fromJS({ text: action.text, completed: false }))
    },
    [actionTypes.REMOVE_TODO](state, action) {
        return state.splice(action.index, 1)
    },
    [actionTypes.COMPLETED_TODO](state, action) {
        const oTodo = state.get(action.index)
        return state.setIn([action.index, 'completed'], !oTodo.get('completed'))
    },
    [actionTypes.UPDATE_TODO](state, action) {
        return state.setIn([action.index, 'text'], action.text)
    },
    [actionTypes.CHECKED_ALL_TODO](state, action) {
        return state.map(oTodo => oTodo.set('completed', action.checked))
    },
    [actionTypes.CLEAR_COMPLETED_TODO](state) {
        return state.filter(oTodo => (!oTodo.get('completed')))
    }
})

export default todoReducer
