/**
 * Created by anchao on 2016/6/29.
 */
import {dialog} from '../../common/Util';
import * as actionTypes from './actionTypes';
import TodoAPI from '../service/TodoService';

const actionCreator = {
    getAllTodo:function () {
        return dispath => {
            TodoAPI.getAllTodo().done(oData=>{
                if(oData.statusCode == 200){
                    dispath(this.setAllTodo(oData.list));
                }else {
                    dialog.alert('加载失败');
                }
            });
        }
    },
    setAllTodo:function (todos) {
        return {
            type:actionTypes.SET_ALL_TODO,
            todos
        }
    },
    addTodo:function (text) {
        return {
            type:actionTypes.ADD_TODO,
            text
        }
    },
    removeTodo:function (index) {
        return {
            type:actionTypes.REMOVE_TODO,
            index
        }
    },
    completedTodo:function (index) {
        return {
            type:actionTypes.COMPLETED_TODO,
            index
        }
    },
    updateTodo:function (index,text) {
        return {
            type:actionTypes.UPDATE_TODO,
            index,
            text
        }
    },
    checkedAllTodo:function (checked) {
        return {
            type:actionTypes.CHECKED_ALL_TODO,
            checked:checked
        }
    },
    setFilter:function (filter) {
        return {
            type:actionTypes.SET_VISIBILITY_FILTER,
            filter
        }
    },
    clearCompletedTodo:function () {
        return {
            type:actionTypes.CLEAR_COMPLETED_TODO
        }
    }
};

export default actionCreator;