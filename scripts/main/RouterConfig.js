/**
 * Created by anchao on 2016/7/27.
 */
import {
  React,
  ReactDOM,
  Provider,
  Router,
  Route,
  Redirect,
  Switch,
  storeCreateByReducer,
  createHistory
} from '../common/Util'
import { AppContainer } from 'react-hot-loader'
import { reducers } from './reducers'
import { config } from '../conf/config'
import LoginView from '../login/views/LoginMainView'
import MainAppView from '../main/views/MainAppView'
import Main404View from '../main/views/Main404View'

const store = storeCreateByReducer(reducers)
const history = createHistory()
const oContainer = document.querySelector('#container')

export default class RouterConfig {
  init () {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router hashHistory={history}>
            <Switch>
              <Route path={config.url.root} exact render={() => <Redirect to='/login'/>} />
              <Route path={config.url.login.root} component={LoginView} />
              <Route path={config.url.app.root} replace component={MainAppView} />
              <Route component={Main404View} />
            </Switch>
          </Router>
        </Provider>
      </AppContainer>,
      oContainer
    )
  }
}
