/**
 * Created by anchao on 2016/7/26.
 */
import {Immutable} from '../../common/Util';
import * as actionTypes from '../actions/actionTypes';

export const homeListReducer = (state = Immutable.fromJS([]), action)=> {
    switch (action.type) {
        case actionTypes.SET_ALL:
            return Immutable.fromJS(action.list);
        default:
            return state;
    }
};