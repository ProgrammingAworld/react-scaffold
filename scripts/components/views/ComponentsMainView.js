import { React, connect, createSelector, NavLink, Route, Redirect } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import TableExampleView from './TableExampleView'
import AceExampleView from './AceExampleView'
import BootstrapReact from './BootstrapReactView'

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
            <li><NavLink replace to='/app/component/table' activeClassName='active'>表格</NavLink></li>
            <li><NavLink replace to='/app/component/codeeditor' activeClassName='active'>代码编辑器</NavLink></li>
            <li><NavLink replace to='/app/component/bootstrap' activeClassName='active'>react-bootstrap</NavLink></li>
          </ul>
        </div>
        <div className='pull-right'>
          <Route path={`${url}/table`} component={(props) => <TableExampleView {...props} />} />
          <Route path={`${url}/codeeditor`} component={(props) => <AceExampleView {...props} />} />
          <Route path={`${url}/bootstrap`} component={(props) => <BootstrapReact {...props} />} />
          <Route path={url} exact render={() => <Redirect to={`${url}/table`} />} />
        </div>
      </div>
    )
  }
}

const componentData = createSelector([], () => {
  return {}
})

export default connect(componentData)(ComponentsMainView)
