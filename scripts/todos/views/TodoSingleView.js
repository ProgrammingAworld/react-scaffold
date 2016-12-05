/**
 * Created by anchao on 2016/6/30.
 */
import {React, PureRenderMixin} from '../../common/Util';

class TodoSingleView extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    editNameHandler(e) {
        this.props.onEditTodo(e.currentTarget.value.trim());
    }

    finishNameEdit(e) {
        this.props.hideEdit(e.currentTarget.value.trim());
    }

    keyDownFinishNameEdit(e) {
        if (e.which == 13) {
            this.finishNameEdit(e);
            e.preventDefault();
        }
    }

    showEdit(e) {
        this.props.showEdit();
        let oLi = e.currentTarget;

        setTimeout(function () {
            oLi.children[1].focus();
        }, 30);
    }

    render() {
        let oTodo = this.props.todo;
        let bShowDel = this.props.showDel;
        let bCanEdit = this.props.canEdit;
        let destroyCls = bShowDel ? 'destroy' : 'destroy hide';

        let viewCls = bCanEdit ? 'view hide' : 'view';
        let editCls = bCanEdit ? 'edit' : 'edit hide';

        let labelCls = oTodo.get('completed') ? 'completed' : '';

        return (
            <li onMouseEnter={this.props.showDeleteIco} onMouseLeave={this.props.hideDeleteIco}
                onDoubleClick={this.showEdit.bind(this)}>
                <div className={viewCls}>
                    <input className="toggle" type="checkbox" checked={oTodo.get('completed')}
                           onChange={this.props.completedTodo}/>
                    <label className={labelCls}>{oTodo.get('text')}</label>
                    <button className={destroyCls} onClick={this.props.removeTodo}></button>
                </div>
                <input className={editCls} value={oTodo.get('text')} onChange={this.editNameHandler.bind(this)}
                       onKeyDown={this.keyDownFinishNameEdit.bind(this)} onBlur={this.finishNameEdit.bind(this)}/>
            </li>
        );
    }
}

export default TodoSingleView;