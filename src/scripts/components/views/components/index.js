import {
    React,
    NavLink,
    Route,
    Redirect,
    Switch,
    PropTypes
} from 'common/Util'
import config from 'conf'

const ComponentMain = function (props) {
    const { url } = props.match
    
    return (
        <div className="componentmain clearfix">
            <div className="pull-left">
                <ul className="list-unstyled">
                    <li>
                        <NavLink
                            to={config.url.app.table.path}
                            activeClassName="active"
                        >
                            表格
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.codeeditor.path}
                            activeClassName="active"
                        >
                            代码编辑器
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.bootstrap.path}
                            activeClassName="active"
                        >
                            react-bootstrap
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.validator.path}
                            activeClassName="active"
                        >
                            validator
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.antd.path}
                            activeClassName="active"
                        >
                            antd
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="pull-right">
                <Switch>
                    <Route
                        path={config.url.app.table.path}
                        component={config.url.app.table.component}
                    />
                    <Route
                        path={config.url.app.codeeditor.path}
                        component={config.url.app.codeeditor.component}
                    />
                    <Route
                        path={config.url.app.bootstrap.path}
                        component={config.url.app.bootstrap.component}
                    />
                    <Route
                        path={config.url.app.validator.path}
                        component={config.url.app.validator.component}
                    />
                    <Route
                        path={config.url.app.antd.path}
                        component={config.url.app.antd.component}
                    />
                    <Route
                        path={url}
                        render={() => <Redirect to={config.url.app.table.path} />}
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
