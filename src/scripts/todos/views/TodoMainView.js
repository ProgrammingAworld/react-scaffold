/**
 * Created by anchao on 2016/6/29.
 */
import { React, connect, createSelector, dialog } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import * as actionTypes from '../actions/actionTypes'
import actionCreator from '../actions/actionCreator'
import AddTodoView from './components/AddTodoView'
import TodoListView from './components/TodoListView'
import FooterView from './components/FooterView'

class TodoMainView extends ReactComponentBase {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(actionCreator.getAllTodo((status, data) => {
            if (status) {
                dispatch(actionCreator.setAllTodo(data))
            } else {
                dialog.alert(data, 'error')
            }
        }))
    }

    render() {
        const {
            dispatch, todos, visibleTodos, filter
        } = this.props
        return (
            <div className="todomain">
                <AddTodoView
                    onAddNewTodo={sText => dispatch(actionCreator.addTodo(sText))}
                />
                <TodoListView
                    onCheckedAll={checked => dispatch(actionCreator.checkedAllTodo(checked))}
                    onCompletedTodo={index => dispatch(actionCreator.completedTodo(index))}
                    onRemoveTodo={index => dispatch(actionCreator.removeTodo(index))}
                    onEditTodo={(index, text) => dispatch(actionCreator.updateTodo(index, text))}
                    todos={visibleTodos}
                />
                <FooterView
                    todos={todos}
                    filter={filter}
                    onChangeFilter={newFilter => dispatch(actionCreator.setFilter(newFilter))}
                    onClearCompleted={() => dispatch(actionCreator.clearCompletedTodo())}
                />
            </div>
        )
    }
}

const todos = state => state.todos_todos
const filter = state => state.todos_filter
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
const getTodosByFilter = createSelector([todos, filter], (aTodos, sFilter) => ({
    todos: aTodos,
    visibleTodos: selectByFilter(aTodos, sFilter),
    filter: sFilter
}))

export default connect(getTodosByFilter)(TodoMainView)
