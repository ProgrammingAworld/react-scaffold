/**
 * Created by anchao on 2016/6/29.
 */
import { React } from 'common/Util'
import AddTodoView from '../container/addTodo/index'
import TodoListView from '../container/visibleTodoList/index'
import FooterView from '../container/footer/index'

const TodoMain = function () {
    return (
        <div className="todomain">
            <AddTodoView />
            <TodoListView />
            <FooterView />
        </div>
    )
}

export default TodoMain
