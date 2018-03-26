/**
 * Created by anchao on 2016/6/30.
 */

import { React } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import classNames from 'classnames/bind'

class TodoSingleView extends ReactComponentBase {
  editNameHandler = (e) => {
      this.props.onEditTodo(e.currentTarget.value.trim())
  }

  finishNameEdit = (e) => {
      this.props.hideEdit(e.currentTarget.value.trim())
  }

  keyDownFinishNameEdit = (e) => {
      if (e.which === 13) {
          this.finishNameEdit(e)
          e.preventDefault()
      }
  }

  showEdit = (e) => {
      this.props.showEdit()
      const oLi = e.currentTarget

      setTimeout(() => {
          oLi.children[1].focus()
      }, 30)
  }

  render() {
      const {
          todo: oTodo,
          showDel: bShowDel,
          canEdit: bCanEdit,
          showDeleteIco,
          hideDeleteIco,
          removeTodo
      } = this.props
      
      return (
          <li
              onMouseEnter={showDeleteIco}
              onMouseLeave={hideDeleteIco}
              onDoubleClick={this.showEdit}
          >
              <div className={classNames('view', { hide: bCanEdit })}>
                  <input
                      className="toggle"
                      type="checkbox"
                      checked={oTodo.get('completed')}
                      onChange={this.props.completedTodo}
                  />
                  <div className={classNames('normal', { completed: oTodo.get('completed') })}>{oTodo.get('text')}</div>
                  <button className={classNames('destroy', { hide: !bShowDel })} onClick={removeTodo} />
              </div>
              <input
                  className={classNames('edit', { hide: !bCanEdit })}
                  value={oTodo.get('text')}
                  onChange={this.editNameHandler}
                  onKeyDown={this.keyDownFinishNameEdit}
                  onBlur={this.finishNameEdit}
              />
          </li>
      )
  }
}

export default TodoSingleView
