/**
 * Created by anchao on 2016/7/26.
 */
import * as actionTypes from '../actions/actionTypes'

export const userTypeReducer = (state = actionTypes.USER_TYPE[0], action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TYPE:
      return actionTypes.USER_TYPE[action.userType]
    default:
      return state
  }
}
