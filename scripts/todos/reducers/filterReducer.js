/**
 * Created by anchao on 2016/6/30.
 */
import * as actionTypes from '../actions/actionTypes';
export const filterReducer = (state = actionTypes.VisibilityFilters.SHOW_ALL,action) => {
    switch (action.type){
        case actionTypes.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};