/**
 * Created by anchao on 2016/7/26.
 */
import {
    React,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'common/Util'
import config from 'conf'
import HeaderView from './HeaderView'

const MainAppView = function (props) {
    const { url } = props.match
    
    return (
        <div id="chief">
            <HeaderView />
            <Switch>
                <Route path={config.url.app.todos.path} component={config.url.app.todos.component} />
                <Route path={config.url.app.component.path} component={config.url.app.component.component} />
                <Route path={url} exact render={() => <Redirect to={config.url.app.todos.path} />} />
            </Switch>
        </div>
    )
}

MainAppView.propTypes = {
    match: PropTypes.object.isRequired
}

export default MainAppView
