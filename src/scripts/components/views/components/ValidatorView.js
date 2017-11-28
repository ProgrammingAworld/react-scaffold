import { React } from '../../../common/Util'
import ReactComponentBase from '../../../base/ReactComponentBase'

class ValidatorView extends ReactComponentBase {
  componentDidMount(){
    console.log(Date.now())
  }

  render () {
    return (
      <div>验证组件1122</div>
    )
  }
}

export default ValidatorView