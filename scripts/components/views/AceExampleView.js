import { React } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'

class AceExampleView extends ReactComponentBase {
  constructor (props){
    super(props)
  }

  render(){
    return (
      <div>这是一个代码编辑的区域</div>
    )
  }
}

export default AceExampleView