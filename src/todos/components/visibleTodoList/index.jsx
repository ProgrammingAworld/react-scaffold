/**
 * 功能：可视todo列表
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes, PureComponent } from 'framework/Util'
import Todo from './Todo'
import './scss/index.scss'

class VisibleTodoList extends PureComponent {
    componentDidMount() {
        const { getAllTodo, todos } = this.props
        
        if (todos.length === 0) getAllTodo()
    }
    
    render() {
        const {
            todos,
            checkedAllTodo, removeTodo, updateTodo
        } = this.props
        const bCheckedAll = todos.filter(item => item.completed).length === todos.length
        
        return (
            <section className="main-todos">
                <input
                    className="toggle-all"
                    type="checkbox"
                    checked={bCheckedAll}
                    onChange={() => checkedAllTodo(!bCheckedAll)}
                />
                <ul className="todo-list list-unstyled">
                    {
                        todos.length === 0 && <li><div className="view text-center">没有数据！</div></li>
                    }
                    {
                        todos.length > 0 && todos.map(oTodo => (
                            <Todo
                                key={oTodo.id}
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
    todos: PropTypes.array.isRequired,
    getAllTodo: PropTypes.func.isRequired,
    checkedAllTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
}

export default VisibleTodoList
