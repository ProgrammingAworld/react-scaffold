/**
 * Created by anchao on 2016/7/26.
 */
import { React, connect, createSelector } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'

class MainAppView extends ReactComponentBase {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props);
    return (
      <div id="chief">da</div>
    )
  }
}

const appData = createSelector([], () => {
  return {}
})

export default connect(appData)(MainAppView)