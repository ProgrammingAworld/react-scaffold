/**
 * 功能： 页脚
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'common/Util'
import config from 'conf'
import classNames from 'classnames/bind'

const { constant } = config

const Footer = function ({
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
                {onRenderLi(constant.VisibilityFilters.SHOW_ALL, 'All')}
                {onRenderLi(constant.VisibilityFilters.SHOW_ACTIVE, 'Active')}
                {onRenderLi(constant.VisibilityFilters.SHOW_COMPLETED, 'Completed')}
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


Footer.propTypes = {
    todos: PropTypes.object.isRequired,
    todoFilter: PropTypes.string.isRequired,
    clearCompletedTodo: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired
}

export default Footer
