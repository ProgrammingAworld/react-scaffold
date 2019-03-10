/**
 * Created by anchao on 2016/6/30.
 */

import { connect, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import VisibleTodoList from '../../components/visible-todolist'
import Utils from '../../utils'

const todosSelector = state => state.todos

const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: Utils.selectByFilter(oTodos.todoList.get('list'), oTodos.todoFilter).toJS()
}))

export default connect(todosByFilterSelector, actionCreator)(VisibleTodoList)
