/**
 * 功能：收缩组件
 * 作者：安超
 * 日期：2018/8/8
 */
import { React, PropTypes, noop, PureComponent, classNames } from 'framework/Util'

class Index extends PureComponent{
    constructor(props){
        super(props)
        const { show } = props
        this.state = {
            showState: show
        }
    }
    
    onShowChange = () => {
        this.setState((prevState) => {
            const { onShowChange } = this.props
            const newShow = !prevState.show
            onShowChange(newShow)
            return {
                showState: newShow
            }
        })
    }
    
    render(){
        const { show } = this.props
        const { showState } = this.state
        return (
            <div style={{ border: '1px solid red', width: 300, height: 300 }} key={showState}>
                <div className={classNames({ hide: !show })} style={{ border: '1px solid red', width: 100, height: 100 }}>内容</div>
                <button type="button" onClick={this.onShowChange}>显示隐藏</button>
            </div>
        )
    }
}

Index.getDerivedStateFromProps = (props) => {
    const { show } = props

    return {
        show
    }
}

Index.defaultProps = {
    show: true,
    onShowChange: noop
}

Index.propTypes = {
    show: PropTypes.bool,
    onShowChange: PropTypes.func
}

export default Index
