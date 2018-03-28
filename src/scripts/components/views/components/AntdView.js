/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import diaglog from 'common/dialog'

class AntdView extends ReactComponentBase {
    state = {
        name: ''
    }
    
    btnClick = () => {
        const Content = <div className="aaa">这里是一些内容</div>
        
        diaglog.normal({
            title: '测试',
            infoType: 'success',
            content: Content
        })
    }
    
    render() {
        return (
            <div>测试{this.state.name}
                <button onClick={this.btnClick}>dialog</button>
            </div>
        )
    }
}

export default AntdView
