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
import TodosMain from 'root/todos/views/components'
import ComponentMain from 'root/components/views/components'
import HeaderView from './HeaderView'

const MainAppView = function (props) {
    const { url } = props.match
    
    return (
        <div id="chief">
            <HeaderView />
            <Switch>
                <Route path={config.url.app.todos} component={TodosMain} />
                <Route path={config.url.app.component} component={ComponentMain} />
                <Route path={url} exact render={() => <Redirect to={config.url.app.todos} />} />
            </Switch>
        </div>
    )
}

MainAppView.propTypes = {
    match: PropTypes.object.isRequired
}

export default MainAppView
