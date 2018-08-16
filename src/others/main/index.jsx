import { lazyload } from 'framework'
import {
    React,
    NavLink,
    Route,
    Redirect,
    Switch,
    PropTypes
} from 'framework/Util'
import config from 'conf'
import './scss/index.scss'

const ComponentMain = function ({ match: { url } }) {
    return (
        <div className="componentmain-others clearfix">
            <div className="pull-left">
                <ul className="list-unstyled">
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.validator.path}
                            activeClassName="active"
                        >
                            测试接口
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.antd.path}
                            activeClassName="active"
                        >
                            antd
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.drag.path}
                            activeClassName="active"
                        >
                            拖拽
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.map.path}
                            activeClassName="active"
                        >
                            地图
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="pull-right">
                <Switch>
                    <Route
                        path={config.url.app.validator.path}
                        component={lazyload(import('@/others/validator'))}
                    />
                    <Route
                        path={config.url.app.antd.path}
                        component={lazyload(import('@/others/antd'))}
                    />
                    <Route
                        path={config.url.app.drag.path}
                        component={lazyload(import('@/others/drag'))}
                    />
                    <Route
                        path={config.url.app.map.path}
                        component={lazyload(import('@/others/map'))}
                    />
                    <Route
                        path={url}
                        render={() => <Redirect to={config.url.app.validator.path} />}
                    />
                </Switch>
            </div>
        </div>
    )
}

ComponentMain.propTypes = {
    match: PropTypes.object.isRequired
}

export default ComponentMain
