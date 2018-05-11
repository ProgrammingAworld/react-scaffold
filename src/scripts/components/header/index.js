/**
 * Created by anchao on 2016/6/29.
 */
import { React, NavLink } from 'framework/Util'
import config from 'conf'

const Header = function () {
    return (
        <div id="header" className="clearfix">
            <div className="pull-left" id="logo" />
            <div className="pull-left navigation">
                <ul className="list-unstyled list-inline">
                    <li><NavLink replace to={config.url.login.path} activeClassName="active">登录</NavLink></li>
                    <li>
                        <NavLink replace to={config.url.app.todos.path} activeClassName="active">todos示例</NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.others.path}
                            activeClassName="active"
                        >其它
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="pull-right" />
        </div>
    )
}

export default Header
