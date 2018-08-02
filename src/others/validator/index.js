import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import './scss/index.scss'

function Validator() {
    return (
        <div className="validatormain-others">
            <Validator.TabTitle />
            <Validator.TabContent />
        </div>
    )
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
