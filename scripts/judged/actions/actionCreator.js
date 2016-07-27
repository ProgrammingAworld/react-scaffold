/**
 * Created by anchao on 2016/7/26.
 */
import * as actionTypes from './actionTypes';
import JudgedService from '../service/JudgedService';

const actionCreator = {
    getAll: function () {
        return dispatch=> {
            JudgedService.getAll().done(oData=> {
                if (oData.statusCode == 200) {
                    dispatch(this.setAll(oData.list));
                }
            })
        }
    },
    setAll: function (list) {
        return {
            type: actionTypes.SET_ALL,
            list
        }
    }
};
export default actionCreator;