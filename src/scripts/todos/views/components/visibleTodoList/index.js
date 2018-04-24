/**
 * 功能：可视todo列表
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'common/Util'
import ReactComponentBase from 'root/base/ReactComponentBase'
import Todo from './Todo'

class VisibleTodoList extends ReactComponentBase {
    componentDidMount() {
        this.props.getAllTodo()
    }
    
    render() {
        const {
            todos,
            checkedAllTodo, removeTodo, updateTodo
        } = this.props
        const bCheckedAll = todos.filter(item => item.get('completed')).size === todos.size
        
        return (
            <section className="main">
                <input
                    id="toggle-all"
                    type="checkbox"
                    checked={bCheckedAll}
                    onChange={() => checkedAllTodo(!bCheckedAll)}
                />
                <ul id="todo-list" className="list-unstyled">
                    {
                        todos.size === 0 && <li><div className="view text-center">没有数据！</div></li>
                    }
                    {
                        todos.size > 0 && todos.map(oTodo => (
                            <Todo
                                key={oTodo.get('id')}
                                data={oTodo}
                                onUpdateTodo={updateTodo}
                                removeTodo={removeTodo}
                            />
                        ))
                    }
                </ul>
            </section>
        )
    }
}

VisibleTodoList.propTypes = {
    todos: PropTypes.object.isRequired,
    getAllTodo: PropTypes.func.isRequired,
    checkedAllTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
}

export default VisibleTodoList
