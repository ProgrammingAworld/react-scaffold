/**
 * Created by anchao on 2016/6/30.
 */

import {React,PureRenderMixin} from '../../common/Util';
const FooterView = React.createClass({
    mixins:[PureRenderMixin],
    onRenderLi:function (filter, name) {
        if(filter == this.props.filter){
            return (
                <li>
                    <a className="selected" href="javascript:;" onClick={()=>this.props.onChangeFilter(filter)}>{name}</a>
                </li>
            );
        }else {
            return (
                <li>
                    <a href="javascript:;" onClick={()=>this.props.onChangeFilter(filter)}>{name}</a>
                </li>
            );
        }
    },
    render: function () {
        let aTodos = this.props.todos;
        let clsName = aTodos.size == 0 ? 'hide' : '';
        let nCompletedCount = aTodos.filter(oTodo=>!oTodo.get('completed')).size;
        let completedCls = aTodos.size - nCompletedCount > 0 ? 'pull-right' : 'pull-right hide';

        return (
            <footer id="footer" className={clsName}>
                <span id="todo-count" className="pull-left"><strong>{nCompletedCount}</strong> items left</span>
                <ul id="filters" className="list-unstyled list-inline">
                    {this.onRenderLi('SHOW_ALL','All')}
                    {this.onRenderLi('SHOW_ACTIVE','Active')}
                    {this.onRenderLi('SHOW_COMPLETED','Completed')}
                </ul>
                <button id="clear-completed" className={completedCls} onClick={this.props.onClearCompleted}>Clear completed</button>
            </footer>
        );
    }
});

export default FooterView;