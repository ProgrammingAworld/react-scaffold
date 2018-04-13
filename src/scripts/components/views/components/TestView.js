/**
 * 功能：测试组件
 * 作者：安超
 * 日期： 2018/4/12
 */

import { React, axios } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    responseType: 'json'
})

class TestView extends ReactComponentBase {
    state = {
        test: 'abc'
    }
    
    getTest = () => {
        instance.get('/api/login', { params: { id: 100, name: 'tom' }, data: { age: 100 } })
            .then(res => res.data)
            .then((res) => {
                console.log(res)
            })
    }
    
    render() {
        return (
            <div>
                <input type="button" value="get" onClick={this.getTest} />
            </div>
        )
    }
}

export default TestView
