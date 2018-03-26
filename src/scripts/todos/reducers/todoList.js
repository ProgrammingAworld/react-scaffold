/**
 * 功能： todos列表
 * 作者：安超
 * 日期： 2018/3/26
 */

import { Immutable, handleActions } from 'common/Util'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    list: Immutable.fromJS([])
}

const todoList = handleActions({
    [actionTypes.GET_ALL_TODO]: {
        pre: state => ({ ...state, isLoading: true }),
        success: (state, action) => ({
            ...state,
            list: Immutable.fromJS(action.payload)
        }),
        error: state => (
            { ...state, isLoading: false }
        ),
        always: state => ({ ...state, isLoading: false })
    },
    [actionTypes.ADD_TODO](state, action) {
        return {
            ...state,
            list: state.list
                .unshift(Immutable.fromJS(action.payload))
        }
    },
    [actionTypes.REMOVE_TODO](state, action) {
        return {
            ...state,
            list: state.list.splice(action.payload, 1)
        }
    },
    [actionTypes.COMPLETED_TODO](state, action) {
        const checked = state.list.getIn([action.payload, 'completed'])
        return {
            ...state,
            list: state.list.setIn([action.payload, 'completed'], !checked)
        }
    },
    [actionTypes.UPDATE_TODO](state, action) {
        const { index, text } = action.payload
        return {
            ...state,
            list: state.list.setIn([index, 'text'], text)
        }
    },
    [actionTypes.CHECKED_ALL_TODO](state, action) {
        return {
            ...state,
            list: state.list.map(oTodo => oTodo.set('completed', action.payload))
        }
    },
    [actionTypes.CLEAR_COMPLETED_TODO](state) {
        return {
            ...state,
            list: state.list.filter(oTodo => (!oTodo.get('completed')))
        }
    }
}, initialState)

export default todoList
