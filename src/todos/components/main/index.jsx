/**
 * Created by anchao on 2016/6/29.
 */
import { React, hot } from 'framework/Util'
import AddTodoView from '../../container/addTodo'
import TodoListView from '../../container/visibleTodoList'
import FooterView from '../../container/footer'
import './scss/index.scss'

const TodoMain = function () {
    return (
        <div styleName="todomain-todos">
            <AddTodoView />
            <TodoListView />
            <FooterView />
        </div>
    )
}

export default hot(module)(TodoMain)
