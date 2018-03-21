import {
    React,
    NavLink,
    Route,
    Redirect,
    Switch,
    PropTypes
} from 'common/Util'
import config from '../../conf/config'
import TableExampleView from './components/TableExampleView'
import AceExampleView from './components/AceExampleView'
import BootstrapReactView from './components/BootstrapReactView'
import ValidatorView from './components/ValidatorView'
import AntdView from './components/AntdView'

const ComponentsMainView = function (props) {
    const { url } = props.match
    
    return (
        <div className="componentmain clearfix">
            <div className="pull-left">
                <ul className="list-unstyled">
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.table}
                            activeClassName="active"
                        >
                            表格
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.codeeditor}
                            activeClassName="active"
                        >
                            代码编辑器
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.bootstrap}
                            activeClassName="active"
                        >
                            react-bootstrap
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.validator}
                            activeClassName="active"
                        >
                            validator
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
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
                        replace
                        path={config.url.app.table}
                        component={TableExampleView}
                    />
                    <Route
                        replace
                        path={config.url.app.codeeditor}
                        component={AceExampleView}
                    />
                    <Route
                        replace
                        path={config.url.app.bootstrap}
                        component={BootstrapReactView}
                    />
                    <Route
                        replace
                        path={config.url.app.validator}
                        component={ValidatorView}
                    />
                    <Route
                        replace
                        path={config.url.app.antd}
                        component={AntdView}
                    />
                    <Route
                        exact
                        path={url}
                        render={() => <Redirect to={config.url.app.validator} />}
                    />
                </Switch>
            </div>
        </div>
    )
}

ComponentsMainView.propTypes = {
    match: PropTypes.object.isRequired
}

export default ComponentsMainView
