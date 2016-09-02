/**
 * Created by anchao on 2016/7/28.
 */
import * as actionTypes from '../actions/actionTypes';

export const usernameReducer = (state = "...", action)=> {
    switch (action.type) {
        case actionTypes.SET_USERNAME:
            return action.username;
        default:
            return state;
    }
};