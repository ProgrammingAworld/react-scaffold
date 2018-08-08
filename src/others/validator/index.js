import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import Collapse from './collapse'
import './scss/index.scss'

class Validator extends ReactComponentBase{
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
        return (
            <div className="validatormain-others">
                <button type="button" onClick={this.showAndHide}>显示隐藏</button>
                <Collapse show={this.state.show} onShowChange={this.onShowChange} />
                <Validator.TabTitle />
                <Validator.TabContent />
            </div>
        )
    }
}

Validator.TabTitle = class TabTitle extends ReactComponentBase {
    constructor(props){
        super(props)
        
        this.state = {
            title: '验证标题'
        }
    }
    
    render(){
        return (
            <div>{this.state.title}</div>
        )
    }
}

Validator.TabContent = class TabContent extends ReactComponentBase {
    constructor(props){
        super(props)
        
        this.state = {
            content: '这里是一些内容'
        }
    }
    
    render(){
        return (
            <div>{this.state.content}</div>
        )
    }
}

export default Validator
