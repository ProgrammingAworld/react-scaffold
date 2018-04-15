/**
 * 功能：测试组件
 * 作者：安超
 * 日期： 2018/4/12
 */

import { React, axios, NavLink, Switch, Route } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import config from 'conf'

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
                <NavLink
                    to={config.url.app.person.path.replace('/:person?', '/jack')}
                    activeClassName="acitve"
                >
                    person&nbsp;&nbsp;&nbsp;&nbsp;
                </NavLink>
                <NavLink
                    to={config.url.app.animal.path.replace(':animal', 'dog')}
                    activeClassName="acitve"
                >
                    animal
                </NavLink>
                <input type="button" value="get" onClick={this.getTest} />
                <div>
                    <Switch>
                        <Route
                            path={config.url.app.person.path}
                            component={config.url.app.person.component}
                        />
                        <Route
                            path={config.url.app.animal.path}
                            component={config.url.app.animal.component}
                        />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default TestView
