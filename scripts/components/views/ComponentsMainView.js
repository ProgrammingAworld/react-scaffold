import {
  React,
  connect,
  withRouter,
  createSelector,
  NavLink,
  Route,
  Redirect,
  Switch
} from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import {config} from '../../conf/config'
import TableExampleView from './components/TableExampleView'
import AceExampleView from './components/AceExampleView'
import BootstrapReact from './components/BootstrapReactView'

class ComponentsMainView extends ReactComponentBase {
  constructor (props) {
    super(props)
  }

  render () {
    let {url} = this.props.match

    return (
      <div className='componentmain clearfix'>
        <div className='pull-left'>
          <ul className='list-unstyled'>
            <li><NavLink replace to={config.url.app.table} activeClassName='active'>表格</NavLink></li>
            <li><NavLink replace to={config.url.app.codeeditor} activeClassName='active'>代码编辑器</NavLink></li>
            <li><NavLink replace to={config.url.app.bootstrap} activeClassName='active'>react-bootstrap</NavLink></li>
          </ul>
        </div>
        <div className='pull-right'>
          <Switch>
            <Route path={config.url.app.table} component={(props) => <TableExampleView {...props} />} />
            <Route path={config.url.app.codeeditor} component={(props) => <AceExampleView {...props} />} />
            <Route path={config.url.app.bootstrap} component={(props) => <BootstrapReact {...props} />} />
            <Route path={url} exact render={() => <Redirect to={config.url.app.table} />} />
          </Switch>
        </div>
      </div>
    )
  }
}

const componentData = createSelector([], () => {
  return {}
})

export default withRouter(connect(componentData)(ComponentsMainView))
