/**
 * Created by anchao on 2016/5/25.
 */
let MenuView = React.createClass({
    logout: function () {
        dialog.alert('注销成功');
    },
    render: function () {
        return (
            <div id="normalHeader">
                <div className="logo">
                    <a href="javascript:;"><img src="images/logo.png"/></a>
                </div>
                <ul className="header-menu list-unstyled">
                    <li><a href={this.props.active != 'project'?'project.html':'javascript:;'}
                           className={this.props.active == 'project'?'active':''}><i
                        className="icon-modeldevelopment"></i><span>模型开发</span></a></li>
                    <li><a href={this.props.active != 'project'?'application.html':'javascript:;'}
                           className={this.props.active == 'application'?'active':''}><i
                        className="icon-modelapplication"></i><span>模型应用</span></a></li>
                    <li className="username">
                        <div className="userpic" onClick={this.logout}>
                            <span className="glyphicon glyphicon-user"></span>
                            <span className="glyphicon glyphicon-off"></span>
                        </div>
                        <div className="usernickname">admin</div>
                    </li>
                </ul>
            </div>
        );
    }
});

export default MenuView;