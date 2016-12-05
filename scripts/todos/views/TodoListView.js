/**
 * Created by anchao on 2016/6/30.
 */

import {React, PureRenderMixin} from '../../common/Util';
import Todo from './TodoSingleView';

class TodoListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delIcoIndex: -1,
            editNameIndex: -1
        };

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    showDeleteIco(index) {
        this.setState({
            delIcoIndex: index
        });
    }

    hideDeleteIco() {
        this.setState({
            delIcoIndex: -1
        });
    }

    showEdit(index) {
        this.setState({
            editNameIndex: index
        });
    }

    hideEdit(index, newText) {
        if (newText.length == 0) {
            this.props.onRemoveTodo(index);
        }

        this.setState({
            editNameIndex: -1
        });
    }

    render() {
        let aLis = [];
        let aTodos = this.props.todos;
        let bCheckedAll = true;

        if (aTodos.size > 0) {
            aTodos.forEach((oTodo, index) => {
                aLis.push(<Todo
                    key={index}
                    todo={oTodo}
                    completedTodo={() => this.props.onCompletedTodo(index)}
                    removeTodo={() => this.props.onRemoveTodo(index)}
                    showDeleteIco={() => this.showDeleteIco(index)}
                    hideDeleteIco={this.hideDeleteIco.bind(this)}
                    showDel={this.state.delIcoIndex == index}
                    showEdit={() => this.showEdit(index)}
                    hideEdit={newText => this.hideEdit(index, newText)}
                    canEdit={this.state.editNameIndex == index}
                    onEditTodo={newText => this.props.onEditTodo(index, newText)}
                />);
            });
        }

        //全选是否选中
        for (let oTodo of aTodos) {
            if (!oTodo.get('completed')) {
                bCheckedAll = false;
                break;
            }
        }

        return (
            <section className="main">
                <input className="toggle-all" id="toggle-all" type="checkbox" checked={bCheckedAll}
                       onChange={() => this.props.onCheckedAll(!bCheckedAll)}/>
                <ul id="todo-list" className="list-unstyled">
                    { aLis }
                </ul>
            </section>
        );
    }
}

export default TodoListView;

