/**
 * Created by anchao on 2016/6/30.
 */
import {React} from '../../common/Util';
const TodoSingleView = React.createClass({
    editNameHandler:function (e) {
        this.props.onEditTodo(e.currentTarget.value.trim());
    },
    finishNameEdit:function (e) {
        this.props.hideEdit(e.currentTarget.value.trim());
    },
    keyDownFinishNameEdit:function (e) {
        if(e.which == 13){
            this.finishNameEdit(e);
            e.preventDefault();
        }
    },
    showEdit:function (e) {
        this.props.showEdit();
        let oLi = e.currentTarget;

        setTimeout(function () {
            oLi.children[1].focus();
        },30);
    },
    render: function () {
        let oTodo = this.props.todo;
        let bShowDel = this.props.showDel;
        let bCanEdit = this.props.canEdit;
        let destroyCls = bShowDel ? 'destroy' : 'destroy hide';

        let viewCls = bCanEdit ? 'view hide' : 'view';
        let editCls = bCanEdit ? 'edit' : 'edit hide';

        let labelCls = oTodo.completed ? 'completed' : '';

        return (
            <li onMouseEnter={this.props.showDeleteIco} onMouseLeave={this.props.hideDeleteIco} onDoubleClick={this.showEdit}>
                <div className={viewCls}>
                    <input className="toggle" type="checkbox" checked={oTodo.completed} onChange={this.props.completedTodo}/>
                    <label className={labelCls}>{oTodo.text}</label>
                    <button className={destroyCls} onClick={this.props.removeTodo}></button>
                </div>
                <input className={editCls} value={oTodo.text} onChange={this.editNameHandler} onKeyDown={this.keyDownFinishNameEdit} onBlur={this.finishNameEdit}/>
            </li>
        );
    }
});

export default TodoSingleView;