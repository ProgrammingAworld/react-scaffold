/**
 * Created by anchao on 2016/7/27.
 */
import {
    React,
    Route,
    Redirect,
    Switch,
    hot
} from 'common/Util'
import config from 'conf'
import Dialog from 'common/dialog/container'
import Loading from 'common/loading/container'
import Login from 'root/login/views/container'
import MainApp from 'common/views/MainAppView'
import NotFind from 'common/views/Main404View'

const { url } = config
const RootRoutesView = function () {
    return (
        <div className="containerchild">
            <Switch>
                <Route path={url.root} exact render={() => <Redirect to={url.login.root} />} />
                <Route path={url.login.root} component={Login} />
                <Route path={url.app.root} component={MainApp} />
                <Route component={NotFind} />
            </Switch>
            <Dialog />
            <Loading />
        </div>
    )
}

export default hot(module)(RootRoutesView)
