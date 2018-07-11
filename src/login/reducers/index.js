/**
 * Created by anchao on 2016/7/27.
 */
import { handleActions } from 'framework'
import * as actionTypes from '../actions/actionTypes'

const inintialState = {
    username: '',
    userType: actionTypes.USER_TYPE[0]
}

const loginReducer = handleActions({
    [actionTypes.SET_USER_INFO_LOGIN]: {
        success: (state, action) => {
            const { username, userType } = action.payload
            return {
                username,
                userType: actionTypes.USER_TYPE[parseInt(userType, 10)]
            }
        }
    }
}, inintialState)

export default loginReducer
