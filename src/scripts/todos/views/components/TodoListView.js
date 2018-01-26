/**
 * Created by anchao on 2016/6/30.
 */

import { React } from '../../../common/Util';
import ReactComponentBase from '../../../base/ReactComponentBase';
import Todo from './TodoSingleView';

class TodoListView extends ReactComponentBase {
    constructor(props) {
        super(props);

        this.state = {
            delIcoIndex: -1,
            editNameIndex: -1
        };
    }

    showDeleteIco = (index) => {
        this.setState({
            delIcoIndex: index
        });
    }

    hideDeleteIco = () => {
        this.setState({
            delIcoIndex: -1
        });
    }

    showEdit = (index) => {
        this.setState({
            editNameIndex: index
        });
    }

    hideEdit = (index, newText) => {
        if (newText.length === 0) {
            this.props.onRemoveTodo(index);
        }

        this.setState({
            editNameIndex: -1
        });
    }

    render() {
        const { todos, onCheckedAll } = this.props;
        const bCheckedAll = todos.filter(item => item.get('completed')).size === todos.size;

        return (
            <section className="main">
                <input
                    className="toggle-all"
                    id="toggle-all"
                    type="checkbox"
                    checked={bCheckedAll}
                    onChange={() => onCheckedAll(!bCheckedAll)}
                />
                <ul id="todo-list" className="list-unstyled">
                    {
                        todos.size === 0 && <li><div className="view text-center">没有数据！</div></li>
                    }
                    {
                        todos.size > 0 && todos.map((oTodo, index) => (
                            <Todo
                                key={index}
                                todo={oTodo}
                                completedTodo={() => this.props.onCompletedTodo(index)}
                                removeTodo={() => this.props.onRemoveTodo(index)}
                                showDeleteIco={() => this.showDeleteIco(index)}
                                hideDeleteIco={this.hideDeleteIco}
                                showDel={this.state.delIcoIndex === index}
                                showEdit={() => this.showEdit(index)}
                                hideEdit={newText => this.hideEdit(index, newText)}
                                canEdit={this.state.editNameIndex === index}
                                onEditTodo={newText => this.props.onEditTodo(index, newText)}
                            />
                        ))
                    }
                </ul>
            </section>
        );
    }
}

export default TodoListView;

