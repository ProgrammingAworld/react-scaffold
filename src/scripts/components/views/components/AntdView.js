/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

class AntdView extends ReactComponentBase {
    state = {
        name: ''
    }
    
    render() {
        return (
            <div>测试{this.state.name}</div>
        )
    }
}

export default AntdView
