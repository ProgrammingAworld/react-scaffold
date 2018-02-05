/**
 * Created by anchao on 2016/6/30.
 */
import { Immutable, handleActions } from 'common/Util'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    todoList: Immutable.fromJS([]),
    todoFilter: actionTypes.VisibilityFilters.SHOW_ALL
}

const todoReducer = handleActions({
    [actionTypes.GET_ALL_TODO]: {
        pre: state => ({ ...state, isLoading: true }),
        success: (state, action) => ({
            ...state,
            todoList: Immutable.fromJS(action.payload)
        }),
        always: state => ({ ...state, isLoading: false })
    },
    [actionTypes.ADD_TODO](state, action) {
        return {
            ...state,
            todoList: state.todoList
                .unshift(Immutable.fromJS({ text: action.payload, completed: false }))
        }
    },
    [actionTypes.REMOVE_TODO](state, action) {
        return {
            ...state,
            todoList: state.todoList.splice(action.payload, 1)
        }
    },
    [actionTypes.COMPLETED_TODO](state, action) {
        const checked = state.todoList.getIn([action.payload, 'completed'])
        return {
            ...state,
            todoList: state.todoList.setIn([action.payload, 'completed'], !checked)
        }
    },
    [actionTypes.UPDATE_TODO](state, action) {
        return {
            ...state,
            todoList: state.todoList.setIn([action.payload.index, 'text'], action.payload.text)
        }
    },
    [actionTypes.CHECKED_ALL_TODO](state, action) {
        return {
            ...state,
            todoList: state.todoList.map(oTodo => oTodo.set('completed', action.payload))
        }
    },
    [actionTypes.CLEAR_COMPLETED_TODO](state) {
        return {
            ...state,
            todoList: state.todoList.filter(oTodo => (!oTodo.get('completed')))
        }
    },
    [actionTypes.SET_VISIBILITY_FILTER](state, action) {
        return {
            ...state,
            todoFilter: action.payload
        }
    }
}, initialState)

export default todoReducer
