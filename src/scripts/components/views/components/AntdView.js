/**
 * 功能： antd测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import diaglog from 'dialog'
import loading from 'loading'
import { React } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

class AntdView extends ReactComponentBase {
    state = {
        name: ''
    }
    
    btnClick = () => {
        const Content = <div className="aaa">这里是一些内容</div>
        
        diaglog.confirm({
            title: '测试',
            infoType: 'info',
            content: Content
        })
    }
    
    btnLoadingClick = () => {
        loading.show()
        
        setTimeout(() => {
            loading.hide()
        }, 2000)
    }
    
    render() {
        return (
            <div>测试{this.state.name}
                <button onClick={this.btnClick}>dialog</button>
                <button onClick={this.btnLoadingClick}>loading</button>
            </div>
        )
    }
}

export default AntdView
