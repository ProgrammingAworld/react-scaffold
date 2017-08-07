/**
 * Created by anchao on 2016/6/29.
 */
import {React,NavLink} from '../../common/Util';

class HeaderView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="header" className="clearfix">
                <div className="pull-left" id="logo"></div>
                <div className="pull-left navigation">
                    <ul role="nav" className="list-unstyled list-inline">
                        <li><NavLink replace to="/login" activeClassName="active">登录</NavLink></li>
                        <li><NavLink replace to="/todos" activeClassName="active">示例</NavLink></li>
                    </ul>
                </div>
                <div className="pull-right"></div>
            </div>
        );
    }
}

export default HeaderView;