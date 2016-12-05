/**
 * Created by anchao on 2016/6/29.
 */
import {React, dialog, PureRenderMixin} from '../../common/Util';

class AddTodoView extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    addTodo(e) {
        if (e.which == 13) {
            let sTxt = e.currentTarget.value.trim();
            if (sTxt.length > 0) {
                this.props.onAddNewTodo(sTxt);
                e.currentTarget.value = "";
            } else {
                dialog.alert('内容不能为空');
            }
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="newtodo" placeholder="What needs to be done?" onKeyDown={this.addTodo.bind(this)}/>
            </header>
        );
    }
}

export default AddTodoView;