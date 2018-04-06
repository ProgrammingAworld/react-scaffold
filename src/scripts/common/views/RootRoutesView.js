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
import * as Routes from './RoutesView'

const RootRoutesView = function () {
    return (
        <div className="containerchild">
            <Switch>
                <Route path={config.url.root} exact render={() => <Redirect to="/login" />} />
                <Route path={config.url.login.root} component={Routes.LoginView} />
                <Route path={config.url.app.root} component={Routes.MainAppView} />
                <Route component={Routes.Main404View} />
            </Switch>
            <Dialog />
            <Loading />
        </div>
    )
}

export default hot(module)(RootRoutesView)
