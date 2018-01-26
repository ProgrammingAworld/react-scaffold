/**
 * Created by anchao on 2016/7/27.
 */
import todoReducer from './todoReducer'
import filterReducer from './filterReducer'

const TodosReducers = {
    todos_todos: todoReducer,
    todos_filter: filterReducer
}

export default TodosReducers
