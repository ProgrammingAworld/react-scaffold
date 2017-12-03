/**
 * Created by anchao on 2016/6/30.
 */

import {React} from '../../../common/Util';
import ReactComponentBase from '../../../base/ReactComponentBase';

class FooterView extends ReactComponentBase {
    constructor(props) {
        super(props);
    }

    onRenderLi(filter, name) {
        if (filter == this.props.filter) {
            return (
                <li>
                    <a className="selected" href="javascript:;"
                       onClick={() => this.props.onChangeFilter(filter)}>{name}</a>
                </li>
            );
        } else {
            return (
                <li>
                    <a href="javascript:;" onClick={() => this.props.onChangeFilter(filter)}>{name}</a>
                </li>
            );
        }
    }

    render() {
        let aTodos = this.props.todos;
        let clsName = aTodos.size == 0 ? 'hide' : '';
        let nCompletedCount = aTodos.filter(oTodo => !oTodo.get('completed')).size;
        let completedCls = aTodos.size - nCompletedCount > 0 ? 'pull-right' : 'pull-right hide';

        return (
            <footer id="footer" className={clsName}>
                <span id="todo-count" className="pull-left"><strong>{nCompletedCount}</strong> items left</span>
                <ul id="filters" className="list-unstyled list-inline">
                    {this.onRenderLi.bind(this)('SHOW_ALL', 'All')}
                    {this.onRenderLi.bind(this)('SHOW_ACTIVE', 'Active')}
                    {this.onRenderLi.bind(this)('SHOW_COMPLETED', 'Completed')}
                </ul>
                <button id="clear-completed" className={completedCls} onClick={this.props.onClearCompleted}>Clear
                    completed
                </button>
            </footer>
        );
    }
}

export default FooterView;