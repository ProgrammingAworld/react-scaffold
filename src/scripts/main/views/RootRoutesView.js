/**
 * Created by anchao on 2016/7/27.
 */
import {
  React,
  Route,
  Redirect,
  Switch
} from '../../common/Util'
import { config } from '../../conf/config'
import LoginView from '../../login/views/LoginMainView'
import MainAppView from './MainAppView'
import Main404View from './Main404View'

const RootRoutesView = () => (
  <Switch>
    <Route path={config.url.root} exact render={() => <Redirect to='/login' />} />
    <Route path={config.url.login.root} component={LoginView} />
    <Route path={config.url.app.root} replace component={MainAppView} />
    <Route component={Main404View} />
  </Switch>
)

export default RootRoutesView
