/**
 * Created by anchao on 2016/7/26.
 */
import {
  React,
  connect,
  createSelector,
  Route,
  Redirect,
  Switch
} from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import {config} from '../../conf/config'
import HeaderView from './HeaderView'
import TodoMainView from '../../todos/views/TodoMainView'
import ComponentsMainView from '../../components/views/ComponentsMainView'

class MainAppView extends ReactComponentBase {
  render () {
    let {url} = this.props.match
    return (
      <div id='chief'>
        <HeaderView />
        <Switch>
          <Route path={config.url.app.todos} component={(props) => <TodoMainView {...props} />} />
          <Route path={config.url.app.component} component={(props) => <ComponentsMainView {...props} />} />
          <Route path={url} exact render={() => <Redirect to={config.url.app.todos} />} />
        </Switch>
      </div>
    )
  }
}

const appData = createSelector([], () => {
  return {}
})

export default connect(appData)(MainAppView)
