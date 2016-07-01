/**
 * Created by anchao on 2016/6/30.
 */

import * as actionTypes from '../actions/actionTypes';
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_TODO:
            return action.todos;
        case actionTypes.GET_ALL_TODO:
            return state;
        case actionTypes.ADD_TODO:
            return [
                {text: action.text, completed: false},
                ...state
            ];
        case actionTypes.REMOVE_TODO:
            return [
                ...state.slice(0,action.index),
                ...state.slice(action.index+1)
            ];
        case actionTypes.COMPLETED_TODO:
            let oTodo = state[action.index];
            return [
                ...state.slice(0,action.index),
                Object.assign({}, oTodo,{completed:!oTodo.completed}),
                ...state.slice(action.index+1)
            ];
        case actionTypes.UPDATE_TODO:
            let oTodoTemp = state[action.index];
            return [
                ...state.slice(0,action.index),
                Object.assign({}, oTodoTemp,{text:action.text}),
                ...state.slice(action.index+1)
            ];
        case actionTypes.CHECKED_ALL_TODO:
            return state.map(oTodo => {
                oTodo.completed = action.checked;
                return oTodo;
            });
        case actionTypes.CLEAR_COMPLETED_TODO:
            return state.filter(oTodo =>{
                if(!oTodo.completed){
                    return oTodo;
                }
            });
        default:
            return state;
    }
}