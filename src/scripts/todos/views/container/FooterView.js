/**
 * Created by anchao on 2016/6/30.
 */

import config from 'conf'
import { Immutable, React, connect, createSelector, PropTypes, noop } from 'common/Util'
import classNames from 'classnames/bind'
import actionCreator from '../../actions/actionCreator'

const FooterView = function ({
    todos, todoFilter, clearCompletedTodo, setFilter 
}) {
    function onRenderLi(filter, name) {
        if (filter === todoFilter) {
            return (
                <li>
                    <span
                        role="presentation"
                        className="selected"
                        onClick={() => setFilter(filter)}
                    >{name}
                    </span>
                </li>
            )
        }
        return (
            <li>
                <span
                    role="presentation"
                    onClick={() => setFilter(filter)}
                >{name}
                </span>
            </li>
        )
    }
    
    const nCompletedCount = todos.filter(oTodo => !oTodo.get('completed')).size
    const completedCls = classNames('pull-right', { hide: todos.size - nCompletedCount <= 0 })
    
    return (
        <footer id="footer" className={classNames({ hide: todos.size === 0 })}>
            <div
                id="todo-count"
                className="pull-left"
            >
                <strong>{nCompletedCount}</strong> items left
            </div>
            <ul id="filters" className="list-unstyled list-inline">
                {onRenderLi('SHOW_ALL', 'All')}
                {onRenderLi('SHOW_ACTIVE', 'Active')}
                {onRenderLi('SHOW_COMPLETED', 'Completed')}
            </ul>
            <button
                id="clear-completed"
                className={completedCls}
                onClick={clearCompletedTodo}
            >Clear completed
            </button>
        </footer>
    )
}

FooterView.defaultProps = {
    todos: Immutable.fromJS([]),
    todoFilter: config.constant.VisibilityFilters.SHOW_ALL,
    clearCompletedTodo: noop,
    setFilter: noop
}

FooterView.propTypes = {
    todos: PropTypes.object,
    todoFilter: PropTypes.string,
    clearCompletedTodo: PropTypes.func,
    setFilter: PropTypes.func,
}

const todosSelector = state => state.todos

const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: oTodos.todoList.list,
    todoFilter: oTodos.todoFilter
}))

export default connect(todosByFilterSelector, actionCreator)(FooterView)
