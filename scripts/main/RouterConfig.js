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
import { reducers } from './reducers'
import LoginView from '../login/views/LoginMainView'
import MainAppView from '../main/views/MainAppView'
import Main404View from '../main/views/Main404View'

export default class RouterConfig {
  init () {
    let store = storeCreateByReducer(reducers)
    let history = createHistory()

    ReactDOM.render(
      <Provider store={store}>
        <Router hashHistory={history}>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='/login' />} />
            <Route path='/login' component={LoginView} />
            <Route path='/app' replace component={MainAppView} />
            <Route component={Main404View} />
          </Switch>
        </Router>
      </Provider>,
      document.querySelector('#container')
    )
  }
}
