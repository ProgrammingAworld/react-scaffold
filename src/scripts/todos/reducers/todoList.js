/**
 * 功能： todos列表
 * 作者：安超
 * 日期： 2018/3/26
 */
import { handleActions } from 'common'
import { Immutable } from 'common/Util'
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
            list: state.list.filter(item => item.get('id') !== action.payload)
        }
    },
    [actionTypes.UPDATE_TODO](state, action) {
        const { id, completed, text } = action.payload
        const index = state.list.findIndex(item => item.get('id') === id)
        
        if (completed !== undefined) {
            return {
                ...state,
                list: state.list.setIn([index, 'completed'], completed)
            }
        }
        
        if (text !== undefined) {
            return {
                ...state,
                list: state.list.setIn([index, 'text'], text)
            }
        }
        
        return state
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
