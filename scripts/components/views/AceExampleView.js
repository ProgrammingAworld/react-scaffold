import { React } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/github'

class AceExampleView extends ReactComponentBase {
  constructor (props){
    super(props)
  }

  aceChange = (newValue)=>{
    console.log(newValue)
  }

  render(){
    return (
      <div className='acesec'>
        <AceEditor
          height="100%"
          width="100%"
          mode='javascript'
          theme='github'
          onChange={this.aceChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    )
  }
}

export default AceExampleView