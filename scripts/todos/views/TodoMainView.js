/**
 * Created by anchao on 2016/6/29.
 */
import {React, connect, createSelector} from '../../common/Util';
import * as actionTypes from '../actions/actionTypes';
import actionCreator from '../actions/actionCreator';
import AddTodoView from './AddTodoView';
import TodoListView from './TodoListView';
import FooterView from './FooterView';

const TodoMainView = React.createClass({
    componentDidMount: function () {
        const {dispatch} =  this.props;
        dispatch(actionCreator.getAllTodo());
    },
    render: function () {
        const {dispatch, todos, visibleTodos, filter} =  this.props;
        return (
            <div className="todomain">
                <AddTodoView onAddNewTodo={sText => dispatch(actionCreator.addTodo(sText))}/>
                <TodoListView onCheckedAll={checked=>dispatch(actionCreator.checkedAllTodo(checked))}
                              onCompletedTodo={index=>dispatch(actionCreator.completedTodo(index))}
                              onRemoveTodo={index=>dispatch(actionCreator.removeTodo(index))}
                              onEditTodo={(index,text)=>dispatch(actionCreator.updateTodo(index,text))}
                              todos={visibleTodos}/>
                <FooterView todos={todos} filter={filter}
                            onChangeFilter={newFilter=>dispatch(actionCreator.setFilter(newFilter))}
                            onClearCompleted={()=>dispatch(actionCreator.clearCompletedTodo())}/>
            </div>
        );
    }
});

const todos = state => state.todos;
const filter = state => state.filter;
const selectByFilter = (aTodos, sFilter) => {
    switch (sFilter) {
        case actionTypes.VisibilityFilters.SHOW_ALL:
            return aTodos;
        case actionTypes.VisibilityFilters.SHOW_COMPLETED:
            return aTodos.filter(oTodo=>oTodo.completed);
        case actionTypes.VisibilityFilters.SHOW_ACTIVE:
            return aTodos.filter(oTodo=>!oTodo.completed);
    }
};
const getTodosByFilter = createSelector([todos, filter], (aTodos, sFilter)=> {
    return {
        todos:aTodos,
        visibleTodos: selectByFilter(aTodos, sFilter),
        filter:sFilter
    }
});

export default connect(getTodosByFilter)(TodoMainView);