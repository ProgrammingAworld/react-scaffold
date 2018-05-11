/**
 * Created by anchao on 2016/6/30.
 */

import { React, PropTypes } from 'framework/Util'
import enhanceWithClickOutside from 'react-click-outside'
import ReactComponentBase from 'base/ReactComponentBase'
import classNames from 'classnames/bind'

class TodoSingle extends ReactComponentBase {
    constructor(props) {
        super(props)
        
        this.state = {
            data: props.data,
            hideDelIcon: true,
            hideEditInput: true
        }
    }
    
    toggleHideDelIcon(hideDelIcon) {
        this.setState({ hideDelIcon })
    }
    
    toggleHideEditInput(hideEditInput) {
        this.setState({ hideEditInput })
    }
    
    handleClickOutside() {
        this.toggleHideEditInput(true)
    }
    
    todoUpdate(e, todoKey){
        const text = e.currentTarget.value
        const { onUpdateTodo } = this.props
        this.setState((prevState) => {
            const { data } = prevState
            const id = data.get('id')
            const completed = data.get('completed')
            switch (todoKey) {
            case 'completed':
                onUpdateTodo({ id, completed: !completed })
                return { data: prevState.data.set('completed', !completed) }
            case 'text':
                onUpdateTodo({ id, text })
                return { data: prevState.data.set('text', text) }
            default:
                return { data }
            }
        })
    }
    
    finishNameEdit = (e) => {
        if (e.which === 13) {
            this.toggleHideEditInput(true)
            e.preventDefault()
        }
    }

    render() {
        const {
            removeTodo
        } = this.props
      
        const { data, hideDelIcon, hideEditInput } = this.state
      
        return (
            <li
                onMouseEnter={() => this.toggleHideDelIcon(false)}
                onMouseLeave={() => this.toggleHideDelIcon(true)}
                onDoubleClick={() => this.toggleHideEditInput(false)}
            >
                <div className={classNames('view', { hide: !hideEditInput })}>
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={data.get('completed')}
                        onChange={e => this.todoUpdate(e, 'completed')}
                    />
                    <div className={classNames('normal', { completed: data.get('completed') })}>{data.get('text')}</div>
                    <button className={classNames('destroy', { hide: hideDelIcon })} onClick={() => removeTodo(data.get('id'))} />
                </div>
                <input
                    className={classNames('edit', { hide: hideEditInput })}
                    value={data.get('text')}
                    onChange={e => this.todoUpdate(e, 'text')}
                    onKeyDown={this.finishNameEdit}
                />
            </li>
        )
    }
}

TodoSingle.propTypes = {
    data: PropTypes.object.isRequired,
    removeTodo: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired
}

export default enhanceWithClickOutside(TodoSingle)
