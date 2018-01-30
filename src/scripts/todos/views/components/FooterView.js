/**
 * Created by anchao on 2016/6/30.
 */

import { React } from 'common/Util';
import ReactComponentBase from 'base/ReactComponentBase';

class FooterView extends ReactComponentBase {
    onRenderLi(filter, name) {
        if (filter === this.props.todoFilter) {
            return (
                <li>
                    <span
                        role="presentation"
                        className="selected"
                        onClick={() => this.props.onChangeFilter(filter)}
                    >{name}
                    </span>
                </li>
            );
        }
        return (
            <li>
                <span
                    role="presentation"
                    onClick={() => this.props.onChangeFilter(filter)}
                >{name}
                </span>
            </li>
        );
    }

    render() {
        const aTodos = this.props.todos;
        const clsName = aTodos.size === 0 ? 'hide' : '';
        const nCompletedCount = aTodos.filter(oTodo => !oTodo.get('completed')).size;
        const completedCls = aTodos.size - nCompletedCount > 0 ? 'pull-right' : 'pull-right hide';

        return (
            <footer id="footer" className={clsName}>
                <span
                    id="todo-count"
                    className="pull-left"
                ><strong>{nCompletedCount}</strong> items left
                </span>
                <ul id="filters" className="list-unstyled list-inline">
                    {this.onRenderLi.bind(this)('SHOW_ALL', 'All')}
                    {this.onRenderLi.bind(this)('SHOW_ACTIVE', 'Active')}
                    {this.onRenderLi.bind(this)('SHOW_COMPLETED', 'Completed')}
                </ul>
                <button
                    id="clear-completed"
                    className={completedCls}
                    onClick={this.props.onClearCompleted}
                >Clear completed
                </button>
            </footer>
        );
    }
}

export default FooterView;
