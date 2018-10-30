import { React, PropTypes, PureComponent } from 'framework/Util'
import Collapse from './collapse'
import './scss/index.scss'

class Validator extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show: true,
            status: ''
        }
    }
    
    onShowChange = (show) => {
        this.setState({ show })
    }
    
    showAndHide = () => {
        const { projectInit } = this.props
        projectInit()
        
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }
    
    appendUserTimestamp = () => {
        const { setUserTimestamp } = this.props
        setUserTimestamp(Date.now().toString())
    }
    
    render(){
        const { show, status } = this.state
        return (
            <div className="validatormain-others">
                <button type="button" onClick={this.showAndHide}>显示隐藏</button>
                <Collapse show={show} onShowChange={this.onShowChange} />
                <div>
                    <button type="button" onClick={this.appendUserTimestamp}>在当前用户名的后面追加时间戳</button>
                    <div>{status}</div>
                </div>
            </div>
        )
    }
}

Validator.propTypes = {
    setUserTimestamp: PropTypes.func.isRequired,
    projectInit: PropTypes.func.isRequired
}

Validator.getDerivedStateFromProps = ({ timestamp }, state) => ({
    ...state,
    status: timestamp.length === 0 ? '' : `时间戳改变了,同时倒数第二位数是${timestamp.slice(-2, -1)}`
})


export default Validator
