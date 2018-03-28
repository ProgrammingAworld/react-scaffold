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
import Dialog from 'common/dialog/container'
import HeaderView from './HeaderView'
import TodoMainView from '../../todos/views/components/TodoMainView'
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
            <Dialog />
        </div>
    )
}

MainAppView.propTypes = {
    match: PropTypes.object.isRequired
}

export default MainAppView
