/**
 * Created by anchao on 2016/7/28.
 */
import * as actionTypes from '../actions/actionTypes'

const errorReducer = (state = '', action) => {
    switch (action.type) {
    case actionTypes.SET_ERROR:
        return action.msg
    default:
        return state
    }
}

export default errorReducer
