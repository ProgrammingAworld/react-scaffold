/**
 * Created by anchao on 2016/6/29.
 */
import { combineReducers, Immutable } from '../../common/Util';
import { todoReducer } from './todoReducer';
import { filterReducer } from './filterReducer';

const reducers = combineReducers({
    todos: todoReducer,
    filter:filterReducer
});

export default reducers;