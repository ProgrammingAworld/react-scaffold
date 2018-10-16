/**
 * 功能：广播模式
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React, PropTypes, PureComponent } from 'framework/Util'
import './scss/index.scss'

class BroadCastView extends PureComponent {
    state = {
        status: '时间戳为空'
    }
    
    appendUserTimestamp = () => {
        const { setUserInfoTimestamp } = this.props
        setUserInfoTimestamp(Date.now().toString())
    }
    
    render() {
        const { status } = this.state
        return (
            <div className="broadcast-main-others">
                <div>
                    <button type="button" onClick={this.appendUserTimestamp}>在当前用户名的后面追加时间戳</button>
                </div>
                <div>
                    当前状态：{status}
                </div>
            </div>
        )
    }
}

BroadCastView.propTypes = {
    setUserInfoTimestamp: PropTypes.func.isRequired
}

BroadCastView.getDerivedStateFromProps = ({ timestamp }) => ({
    status: timestamp.length === 0 ? '' : `时间戳改变了同时以${timestamp.slice(-1)}结尾`
})

export default BroadCastView
