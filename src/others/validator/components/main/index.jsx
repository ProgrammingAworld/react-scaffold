import { React, PureComponent } from 'framework/Util'
import Collapse from '../collapse'
import './scss/index.scss'

class Validator extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show: true
        }
    }
    
    onShowChange = (show) => {
        this.setState({ show })
    }
    
    showAndHide = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }
    
    render(){
        const { show } = this.state
        return (
            <div className="validatormain-others">
                <button type="button" onClick={this.showAndHide}>显示隐藏</button>
                <Collapse show={show} onShowChange={this.onShowChange} />
            </div>
        )
    }
}

// Validator.getDerivedStateFromProps = ({ timestamp = Date.now() }, state) => ({
//     ...state,
//     status: timestamp.length === 0 ? '' : `时间戳改变了,同时倒数第二位数是${timestamp.slice(-2, -1)}`
// })


export default Validator
