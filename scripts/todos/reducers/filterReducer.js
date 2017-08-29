/**
 * Created by anchao on 2016/6/30.
 */
import {Tools} from '../../common/Util'
import * as actionTypes from '../actions/actionTypes'

export const filterReducer = Tools.createReducer(actionTypes.VisibilityFilters.SHOW_ALL, {
  [actionTypes.SET_VISIBILITY_FILTER] (state, action) {
    return action.filter
  }
})
