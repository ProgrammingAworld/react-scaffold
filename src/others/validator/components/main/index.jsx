import { React, ReactDOM, PureComponent } from 'framework/Util'
import Parser from 'html-react-parser'
import Collapse from '../collapse'
import './scss/index.scss'

class Validator extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show: true
        }
    }
    
    componentDidMount(){
        const html = '<BR/><i className=\'highlight\'>王</i><i className=\'highlight\'>鹏</i>在给小朋友做推拿。<BR/>'
        ReactDOM.render(
            Parser(`<h1>${html}</h1>`),
            this.containerDiv
        )
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
                <div ref={(containerDiv) => { this.containerDiv = containerDiv }}>测试html-to-react</div>
            </div>
        )
    }
}

// Validator.getDerivedStateFromProps = ({ timestamp = Date.now() }, state) => ({
//     ...state,
//     status: timestamp.length === 0 ? '' : `时间戳改变了,同时倒数第二位数是${timestamp.slice(-2, -1)}`
// })


export default Validator
