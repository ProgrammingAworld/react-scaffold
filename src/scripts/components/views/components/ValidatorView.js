import { React, connect, withRouter, $ } from '../../../common/Util'
import ReactComponentBase from '../../../base/ReactComponentBase'
import axios from 'axios'

class ValidatorView extends ReactComponentBase {
  componentDidMount () {
    console.log(Date.now())
  }

  render () {
    return (
      <div>验证组件<VaTest /></div>
    )
  }
}

class VaTest extends ReactComponentBase {
  getTime = ()=>{
    // $.get('http://192.168.25.35:3000/getTime',function (res) {
    //   if(res.status === 200) {
    //     console.log(res.msg)
    //   } else {
    //     console.log('获得失败')
    //   }
    // }, 'json')


    const msg = 'hellow'
    axios.get(`http://192.168.10.193:3000/handleRobotMsg?q=${msg}`)
      .then(function (res) {
        console.log(res.data.msg)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  createLog = ()=>{
    $.post('http://192.168.25.35:3000/createLog',{data:[{Project_NameEN: 'scopa',id:Date.now()+1000},{Project_NameEN: 'di', id:Date.now()+222222}]},function (res, textStatus, jqXHR) {
      if(res.status === 200) {
        console.log('创建成功')
      } else {
        console.log('创建失败')
      }
    }, 'json')
  }

  render () {
    return (
      <div>
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
