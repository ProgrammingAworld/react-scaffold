/**
 * Created by anchao on 2016/6/30.
 */

import config from 'conf';
import { connect, createSelector } from 'common/Util'
import actionCreator from '../../../actions/actionCreator'
import VisibleTodoList from '../../components/visibleTodoList'

const todosSelector = state => state.todos
const selectByFilter = (aTodos, sFilter) => {
    switch (sFilter) {
    case config.constant.VisibilityFilters.SHOW_ALL:
        return aTodos
    case config.constant.VisibilityFilters.SHOW_COMPLETED:
        return aTodos.filter(oTodo => oTodo.get('completed'))
    case config.constant.VisibilityFilters.SHOW_ACTIVE:
        return aTodos.filter(oTodo => !oTodo.get('completed'))
    default:
        return aTodos
    }
}
const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: selectByFilter(oTodos.todoList.list, oTodos.todoFilter)
}))

export default connect(todosByFilterSelector, actionCreator)(VisibleTodoList)
