/**
 * Created by anchao on 2016/6/29.
 */
import { React,dialog,PureRenderMixin } from '../../common/Util';

const AddTodoView = React.createClass({
    mixins:[PureRenderMixin],
    addTodo: function (e) {
        if(e.which == 13){
            let sTxt = e.currentTarget.value.trim();
            if(sTxt.length>0){
                this.props.onAddNewTodo(sTxt);
                e.currentTarget.value = "";
            }else {
                dialog.alert('内容不能为空');
            }
        }
    },
    render: function () {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="newtodo" placeholder="What needs to be done?" onKeyDown={this.addTodo} />
            </header>
        );
    }
});

export default AddTodoView;