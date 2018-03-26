/**
 * Created by anchao on 2016/6/29.
 */
import { React } from 'common/Util'
import AddTodoView from '../container/AddTodoView'
import TodoListView from '../container/TodoListView'
import FooterView from '../container/FooterView'

const TodoMainView = function () {
    return (
        <div className="todomain">
            <AddTodoView />
            <TodoListView />
            <FooterView />
        </div>
    )
}

export default TodoMainView
