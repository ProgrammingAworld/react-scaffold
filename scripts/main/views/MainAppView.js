/**
 * Created by anchao on 2016/7/26.
 */
import {
  React,
  connect,
  createSelector,
  Route,
  Redirect
} from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import HeaderView from './HeaderView'
import TodoMainView from '../../todos/views/TodoMainView'
import TableMainView from '../../table/views/TableMainView'

class MainAppView extends ReactComponentBase {
  constructor (props) {
    super(props)
  }

  render () {
    let {url} = this.props.match
    return (
      <div id='chief'>
        <HeaderView />
        <Route path={`${url}/todos`} component={(props) => <TodoMainView {...props} />} />
        <Route path={`${url}/table`} component={(props) => <TableMainView {...props} />} />
        <Route path={url} exact render={() => <Redirect to={`${url}/todos`} />} />
      </div>
    )
  }
}

const appData = createSelector([], () => {
  return {}
})

export default connect(appData)(MainAppView)
