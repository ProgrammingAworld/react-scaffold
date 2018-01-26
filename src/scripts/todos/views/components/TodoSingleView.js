/**
 * Created by anchao on 2016/6/30.
 */

import { React } from '../../../common/Util';
import ReactComponentBase from '../../../base/ReactComponentBase';

class TodoSingleView extends ReactComponentBase {
  editNameHandler = (e) => {
      this.props.onEditTodo(e.currentTarget.value.trim());
  };

  finishNameEdit = (e) => {
      this.props.hideEdit(e.currentTarget.value.trim());
  };

  keyDownFinishNameEdit = (e) => {
      if (e.which === 13) {
          this.finishNameEdit(e);
          e.preventDefault();
      }
  };

  showEdit = (e) => {
      this.props.showEdit();
      const oLi = e.currentTarget;

      setTimeout(() => {
          oLi.children[1].focus();
      }, 30);
  };

  render() {
      const {
          todo: oTodo,
          showDel: bShowDel,
          canEdit: bCanEdit,
          showDeleteIco,
          hideDeleteIco,
          removeTodo
      } = this.props;
      const destroyCls = bShowDel ? 'destroy' : 'destroy hide';

      const viewCls = bCanEdit ? 'view hide' : 'view';
      const editCls = bCanEdit ? 'edit' : 'edit hide';

      const labelCls = oTodo.get('completed') ? 'normal completed' : 'normal';

      return (
          <li
              onMouseEnter={showDeleteIco}
              onMouseLeave={hideDeleteIco}
              onDoubleClick={this.showEdit}
          >
              <div className={viewCls}>
                  <input
                      className="toggle"
                      type="checkbox"
                      checked={oTodo.get('completed')}
                      onChange={this.props.completedTodo}
                  />
                  <div className={labelCls}>{oTodo.get('text')}</div>
                  <button className={destroyCls} onClick={removeTodo} />
              </div>
              <input
                  className={editCls}
                  value={oTodo.get('text')}
                  onChange={this.editNameHandler}
                  onKeyDown={this.keyDownFinishNameEdit}
                  onBlur={this.finishNameEdit}
              />
          </li>
      );
  }
}

export default TodoSingleView;
