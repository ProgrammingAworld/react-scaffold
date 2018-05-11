/**
 * Created by anchao on 2016/7/26.
 */
import {
    React,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'framework/Util'
import config from 'conf'
import Header from '../header'

const App = function (props) {
    const { url } = props.match
    
    return (
        <div id="chief">
            <Header />
            <Switch>
                <Route path={config.url.app.todos.path} component={config.url.app.todos.component} />
                <Route path={config.url.app.others.path} component={config.url.app.others.component} />
                <Route path={url} exact render={() => <Redirect to={config.url.app.todos.path} />} />
            </Switch>
        </div>
    )
}

App.propTypes = {
    match: PropTypes.object.isRequired
}

export default App
