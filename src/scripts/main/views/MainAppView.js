/**
 * Created by anchao on 2016/7/26.
 */
import {
    React,
    connect,
    createSelector,
    PropTypes,
    Route,
    Redirect,
    Switch
} from '../../common/Util'
import config from '../../conf/config'
import HeaderView from './HeaderView'
import TodoMainView from '../../todos/views/TodoMainView'
import ComponentsMainView from '../../components/views/ComponentsMainView'

const MainAppView = function (props) {
    const { url } = props.match
    
    return (
        <div id="chief">
            <HeaderView />
            <Switch>
                <Route path={config.url.app.todos} component={TodoMainView} />
                <Route path={config.url.app.component} component={ComponentsMainView} />
                <Route path={url} exact render={() => <Redirect to={config.url.app.todos} />} />
            </Switch>
        </div>
    )
}

MainAppView.propTypes = {
    match: PropTypes.object.isRequired
}


const appData = createSelector([], () => ({}))

export default connect(appData)(MainAppView)
