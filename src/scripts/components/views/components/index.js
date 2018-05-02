import {
    React,
    NavLink,
    Route,
    Redirect,
    Switch,
    PropTypes
} from 'common/Util'
import config from 'conf'
import TableExampleView from './TableExampleView'
import AceExampleView from './AceExampleView'
import BootstrapReactView from './BootstrapReactView'
import ValidatorView from './ValidatorView'
import AntdView from './AntdView'

const ComponentMain = function (props) {
    const { url } = props.match
    
    return (
        <div className="componentmain clearfix">
            <div className="pull-left">
                <ul className="list-unstyled">
                    <li>
                        <NavLink
                            to={config.url.app.table}
                            activeClassName="active"
                        >
                            表格
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.codeeditor}
                            activeClassName="active"
                        >
                            代码编辑器
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.bootstrap}
                            activeClassName="active"
                        >
                            react-bootstrap
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.validator}
                            activeClassName="active"
                        >
                            validator
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={config.url.app.antd}
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
                        path={config.url.app.table}
                        component={TableExampleView}
                    />
                    <Route
                        path={config.url.app.codeeditor}
                        component={AceExampleView}
                    />
                    <Route
                        path={config.url.app.bootstrap}
                        component={BootstrapReactView}
                    />
                    <Route
                        path={config.url.app.validator}
                        component={ValidatorView}
                    />
                    <Route
                        path={config.url.app.antd}
                        component={AntdView}
                    />
                    <Route
                        path={url}
                        render={() => <Redirect to={config.url.app.table} />}
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
