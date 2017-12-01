import { React, connect, withRouter } from '../../../common/Util'
import ReactComponentBase from '../../../base/ReactComponentBase'

class ValidatorView extends ReactComponentBase {
  componentDidMount(){
    console.log(Date.now())
  }

  render () {
    return (
      <div>验证组件<VaTest /></div>
    )
  }
}

class VaTest extends ReactComponentBase{
  render(){
    return (
      <div>aaa11111231231</div>
    )
  }
}

export default connect()(withRouter(ValidatorView))