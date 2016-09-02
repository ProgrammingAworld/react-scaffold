/**
 * Created by anchao on 2016/6/29.
 */
import {React,Link} from '../../common/Util';

let HeaderView = React.createClass({
    render: function () {
        return (
            <div id="header" className="clearfix">
                <div className="pull-left" id="logo"></div>
                <div className="pull-left navigation">
                    <ul role="nav" className="list-unstyled list-inline">
                        <li><Link to="/">登录</Link></li>
                        <li><Link to="/main/todos" activeClassName="active">示例</Link></li>
                    </ul>
                </div>
                <div className="pull-right"></div>
            </div>
        );
    }
});

export default HeaderView;