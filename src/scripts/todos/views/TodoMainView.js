/**
 * Created by anchao on 2016/6/29.
 */
import { React, connect, createSelector } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import * as actionTypes from '../actions/actionTypes'
import actionCreator from '../actions/actionCreator'
import AddTodoView from './components/AddTodoView'
import TodoListView from './components/TodoListView'
import FooterView from './components/FooterView'

class TodoMainView extends ReactComponentBase {
    componentDidMount() {
        const { getAllTodo } = this.props
        
        getAllTodo({
            params: {
                id: 100
            }
        })
    }

    render() {
        const {
            todos, visibleTodos, todoFilter,
            addTodo, checkedAllTodo, completedTodo, removeTodo, updateTodo,
            setFilter, clearCompletedTodo
        } = this.props
        
        return (
            <div className="todomain">
                <AddTodoView
                    onAddNewTodo={sText => addTodo(sText)}
                />
                <TodoListView
                    onCheckedAll={checked => checkedAllTodo(checked)}
                    onCompletedTodo={index => completedTodo(index)}
                    onRemoveTodo={index => removeTodo(index)}
                    onEditTodo={(index, text) =>
                        updateTodo({ index, text })
                    }
                    todos={visibleTodos}
                />
                <FooterView
                    todos={todos}
                    todoFilter={todoFilter}
                    onChangeFilter={newFilter => setFilter(newFilter)}
                    onClearCompleted={() => clearCompletedTodo()}
                />
            </div>
        )
    }
}

const todosSelector = state => state.todos
const selectByFilter = (aTodos, sFilter) => {
    switch (sFilter) {
    case actionTypes.VisibilityFilters.SHOW_ALL:
        return aTodos
    case actionTypes.VisibilityFilters.SHOW_COMPLETED:
        return aTodos.filter(oTodo => oTodo.get('completed'))
    case actionTypes.VisibilityFilters.SHOW_ACTIVE:
        return aTodos.filter(oTodo => !oTodo.get('completed'))
    default:
        return aTodos
    }
}
const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: oTodos.todoList,
    visibleTodos: selectByFilter(oTodos.todoList, oTodos.todoFilter),
    todoFilter: oTodos.todoFilter
}))

export default connect(todosByFilterSelector, actionCreator)(TodoMainView)
