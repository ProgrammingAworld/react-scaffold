/**
 * Created by anchao on 2016/6/30.
 */

import {React, Immutable} from '../../../common/Util';
import ReactComponentBase from '../../../base/ReactComponentBase';

class TodoSingleView extends ReactComponentBase {
  constructor(props) {
    super(props);
  }

  editNameHandler = e => {
    this.props.onEditTodo(e.currentTarget.value.trim());
  };

  finishNameEdit = e => {
    this.props.hideEdit(e.currentTarget.value.trim());
  };

  keyDownFinishNameEdit = e => {
    if (e.which == 13) {
      this.finishNameEdit(e);
      e.preventDefault();
    }
  };

  showEdit = e => {
    this.props.showEdit();
    let oLi = e.currentTarget;

    setTimeout(function() {
      oLi.children[1].focus();
    }, 30);
  };

  render() {
    let {todo: oTodo, showDel: bShowDel, canEdit: bCanEdit, showDeleteIco, hideDeleteIco, removeTodo} = this.props;
    let destroyCls = bShowDel ? 'destroy' : 'destroy hide';

    let viewCls = bCanEdit ? 'view hide' : 'view';
    let editCls = bCanEdit ? 'edit' : 'edit hide';

    let labelCls = oTodo.get('completed') ? 'completed' : '';

    return (
        <li onMouseEnter={showDeleteIco} onMouseLeave={hideDeleteIco}
            onDoubleClick={this.showEdit}>
          <div className={viewCls}>
            <input className="toggle" type="checkbox"
                   checked={oTodo.get('completed')}
                   onChange={this.props.completedTodo}/>
            <label className={labelCls}>{oTodo.get('text')}</label>
            <button className={destroyCls} onClick={removeTodo}></button>
          </div>
          <input className={editCls} value={oTodo.get('text')}
                 onChange={this.editNameHandler}
                 onKeyDown={this.keyDownFinishNameEdit}
                 onBlur={this.finishNameEdit}/>
        </li>
    );
  }
}

export default TodoSingleView;