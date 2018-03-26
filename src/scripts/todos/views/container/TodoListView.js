/**
 * Created by anchao on 2016/6/30.
 */

import config from 'conf';
import { React, connect, createSelector } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import Todo from '../components/TodoSingleView'
import actionCreator from '../../actions/actionCreator'

class TodoListView extends ReactComponentBase {
    constructor(props) {
        super(props)

        this.state = {
            delIcoIndex: -1,
            editNameIndex: -1
        }
    }
    
    componentDidMount() {
        const { getAllTodo } = this.props
        
        getAllTodo()
    }

    showDeleteIco = (index) => {
        this.setState({
            delIcoIndex: index
        })
    }

    hideDeleteIco = () => {
        this.setState({
            delIcoIndex: -1
        })
    }

    showEdit = (index) => {
        this.setState({
            editNameIndex: index
        })
    }

    hideEdit = (index, newText) => {
        if (newText.length === 0) {
            this.props.onRemoveTodo(index)
        }

        this.setState({
            editNameIndex: -1
        })
    }

    render() {
        const {
            todos, checkedAllTodo, completedTodo, removeTodo, updateTodo 
        } = this.props
        const bCheckedAll = todos.filter(item => item.get('completed')).size === todos.size

        return (
            <section className="main">
                <input
                    className="toggle-all"
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
                        todos.size > 0 && todos.map((oTodo, index) => (
                            <Todo
                                key={oTodo.get('id')}
                                todo={oTodo}
                                completedTodo={() => completedTodo(index)}
                                removeTodo={() => removeTodo(index)}
                                showDeleteIco={() => this.showDeleteIco(index)}
                                hideDeleteIco={this.hideDeleteIco}
                                showDel={this.state.delIcoIndex === index}
                                showEdit={() => this.showEdit(index)}
                                hideEdit={newText => this.hideEdit(index, newText)}
                                canEdit={this.state.editNameIndex === index}
                                onEditTodo={text => updateTodo({ index, text })}
                            />
                        ))
                    }
                </ul>
            </section>
        )
    }
}

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

export default connect(todosByFilterSelector, actionCreator)(TodoListView)
