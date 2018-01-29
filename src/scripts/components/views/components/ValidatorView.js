import { React, connect, withRouter, $, axios } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

class ValidatorView extends ReactComponentBase {
    componentDidMount() {
        console.log(Date.now())
    }
    
    render() {
        return (
            <div>验证组件<VaTest /></div>
        )
    }
}

class VaTest extends ReactComponentBase {
    getServerTime = () => {
        axios.get('/api/getTime')
            .then((res) => {
                console.log(res.data.msg)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    getTime = () => {
        $.get('http://172.17.1.197:3000/api/getTime', (res) => {
            if (res.status === 200) {
                console.log(res.msg)
            } else {
                console.log('获得失败')
            }
        }, 'json')
    }
    
    createLog = () => {
        $.post(
            '/api/createLog',
            {
                data: [
                    { Project_NameEN: 'scopa', id: Date.now() + 1000 },
                    { Project_NameEN: 'di', id: Date.now() + 222222 }
                ]
            }, (res) => {
                if (res.status === 200) {
                    console.log('创建成功')
                } else {
                    console.log('创建失败')
                }
            }, 'json'
        )
    }
    
    render() {
        return (
            <div>
                <input
                    type="button"
                    className="btn btn-primary"
                    value="跨域获得服务时间"
                    onClick={this.getServerTime}
                />
                <br />
                <input
                    type="button"
                    className="btn btn-primary"
                    value="获得服务时间"
                    onClick={this.getTime}
                />
                <br />
                <input
                    type="button"
                    className="btn btn-primary"
                    value="创建日志"
                    onClick={this.createLog}
                />
            </div>
        )
    }
}

export default connect()(withRouter(ValidatorView))
