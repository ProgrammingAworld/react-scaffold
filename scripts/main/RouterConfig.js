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
  storeCreateByReducer,
  createHistory
} from '../common/Util'
import { reducers } from './reducers'
import LoginView from '../login/views/LoginMainView'
import TodoMainView from '../todos/views/TodoMainView'
import Main404View from '../main/views/Main404View'

export default class RouterConfig {
  init () {
    let store = storeCreateByReducer(reducers)
    let history = createHistory()

    ReactDOM.render(
      <Provider store={store}>
        <Router hashHistory={history}>
          <div id='chief'>
            <Route path='/' exact render={() => <Redirect to='/login' />} />
            <Route path='/login' exact component={LoginView} />
            <Route path='/todos' exact component={TodoMainView} />
            <Route path='*' exact component={Main404View} />
          </div>
        </Router>
      </Provider>,
      document.querySelector('#container')
    )
  }
}
