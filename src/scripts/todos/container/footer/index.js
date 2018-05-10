/**
 * Created by anchao on 2016/6/30.
 */

import { connect, createSelector } from 'common/Util'
import actionCreator from '../../actions/actionCreator'
import Footer from '../../components/footer'

const todosSelector = state => state.todos
const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: oTodos.todoList.list,
    todoFilter: oTodos.todoFilter
}))

export default connect(todosByFilterSelector, actionCreator)(Footer)
