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
import * as Routes from './RoutesView'

const MainAppView = function (props) {
    const { url } = props.match
    
    return (
        <div id="chief">
            <HeaderView />
            <Switch>
                <Route path={config.url.app.todos} component={Routes.TodoMainView} />
                <Route path={config.url.app.component} component={Routes.ComponentsMainView} />
                <Route path={url} exact render={() => <Redirect to={config.url.app.todos} />} />
            </Switch>
        </div>
    )
}

MainAppView.propTypes = {
    match: PropTypes.object.isRequired
}

export default MainAppView
