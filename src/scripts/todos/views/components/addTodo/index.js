/**
 * 功能：增加todo组件
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'common/Util'
import dialog from 'dialog'

function AddTodo({ addTodo }) {
    function addTodoEv(e) {
        if (e.which === 13) {
            const sTxt = e.currentTarget.value.trim()
            if (sTxt.length > 0) {
                addTodo({ id: Date.now(), text: sTxt, completed: false })
                e.currentTarget.value = ''
            } else {
                dialog.alert('内容不能为空')
            }
        }
    }
    
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="newtodo"
                placeholder="What needs to be done?"
                onKeyDown={addTodoEv}
            />
        </header>
    )
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo
