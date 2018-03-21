import { React, connect, withRouter, $, axios } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'

class ValidatorView extends ReactComponentBase {
    componentDidMount() {
    
    }
    
    render() {
        return (
            <div>验证组件<VaTest /></div>
        )
    }
}

class VaTest extends ReactComponentBase {
    downloadLogList = () => {
        // 下载excel
        window.open('/api/getExcelByArgs?projectNameEn=di&userName=&startTime=20180101&endTime=20180226')
    }
    
    createLog = () => {
        const r = Date.now()
        $.post(
            '/api/logs/es',
            {
                data: [{
                    Reg_ID: `sjz${r}`,
                    User_ID: `zhangsan${r}`,
                    User_Name: '测试帐号1',
                    Organization: '石家庄市公安局情报中心',
                    Organization_ID: '130100010000',
                    Session_ID: '',
                    Project_NameEN: 'es',
                    Project_NameCN: '测试环境1gongan',
                    Terminal_ID: '10.25.12.83',
                    Operate_Time: '20180115163313',
                    Browser: 'chrome',
                    Browser_Version: '49',
                    Window_Size: '1111x263',
                    Resolution: '1440x900',
                    Location: 'http://1gongan.mzhen.cn/core.html#!scopa/home',
                    AgentId: 'u-b3a47c217eb7298b8e49099ae83eb9dc',
                    Referrer: '',
                    Language: 'zh-CN',
                    ClickCont: '应用',
                    ClickReq: 'method:GET,url:/tuning/services/console/stat/log?user_id=shangziwei'
                }
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
    
    getLogList = () => {
        // 获得日志列表
        axios.get('/api/logs/di/', {
            params: {
                pageIndex: 1,
                pageCount: 3,
                startTime: '20180101',
                endTime: '20180226'
            }
        })
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    getUserList = () => {
        // 获得指定时间区间内的用户列表
        axios.get('/api/getUserList', {
            params: {
                projectNameEn: 'di',
                startTime: '20180101',
                endTime: '20180226'
            }
        })
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    getProjectList = () => {
        // 获得工程列表
        axios.get('/api/getProjectList')
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
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
    
    login = () => {
        $.get(
            '/api/login',
            {
                username: 'admin',
                password: '123456'
            }
        ).done((data) => {
            console.log(data.msg)
        })
    }
    
    modifyPwd = () => {
        $.ajax({
            url: '/api/modifyPwd',
            method: 'put',
            data: {
                username: 'admin',
                oldpassword: '123456',
                newpassword: '654321'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    resetPwd = () => {
        $.ajax({
            url: '/api/resetPwd',
            method: 'put',
            data: {
                username: 'admin'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    authorityCheck = () => {
        $.get('/api/authorityCheck').done((data) => {
            console.log(data)
        }).fail(() => {
            console.log('失败')
        })
    }
    
    getDeployUrls = () => {
        $.get('/api/deploy/SCOPA_Test').done((data) => {
            console.log(data)
        })
    }
    
    saveDeployUrls = () => {
        $.post('/api/deploy/SCOPA_Test', {
            deployUrls: ['http://www.sohu.com', 'http://www.163.com', 'http://www.tom.com']
        }).done((data) => {
            console.log(data)
        })
    }
    
    modifyDeployUrls = () => {
        $.ajax({
            url: '/api/deploy/SCOPA_Test',
            method: 'put',
            data: {
                deployUrls: ['http://www.o.com', 'http://www.p.com', 'http://www.q.com']
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    createProjectConfig = () => {
        $.post(`/api/projectConfig/${'alex'}`, {
            hasUserInfo: true,
            queryurl: '/tuning/pass/getUserInfo',
            Reg_ID: 'test',
            User_ID: 'obj',
            User_Name: 'obj.name',
            Organization: 'obj.unit_name',
            Organization_ID: 'obj.unit',
            Session_ID: 'cookie.TUNING_SESSION_ID',
            Project_NameEN: 'test',
            Project_NameCN: 'SCOPA测试环境'
        }).done((data) => {
            console.log('data=', data)
        })
    }
    
    getProjectConfig = () => {
        $.get(`/api/projectConfig/${'test'}`).done((data) => {
            console.log(data)
        })
    }
    
    deleteProjectConfig = () => {
        $.ajax({
            url: `/api/projectConfig/${'test'}`,
            method: 'delete',
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    modifyProjectConfig = () => {
        $.ajax({
            url: `/api/projectConfig/${'test'}`,
            method: 'put',
            data: {
                hasUserInfo: true,
                queryurl: '/tuning/pass/getUserInfo1',
                Reg_ID: 'test2222',
                User_ID: 'obj.user_id',
                User_Name: 'obj.name',
                Organization: 'obj.unit_name',
                Organization_ID: 'obj.unit',
                Session_ID: 'cookie.TUNING_SESSION_ID',
                Project_NameCN: 'SCOPA测试环境'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    getModule = () => {
        $.get('/api/statistics/modules/scopa_test').done((data) => {
            console.log(data)
        })
    }
    
    createModule = () => {
        $.post('/api/statistics/modules/scopa_test', { moduleName: `首页${Math.random()}`, modulePath: 'http://www.sohu.com' })
            .done((data) => {
                console.log('data=', data)
            })
    }
    
    modifyModule = () => {
        $.ajax({
            url: '/api/statistics/modules/scopa_test/52ff1778-b56c-484c-8a89-c536402164e3',
            method: 'put',
            data: {
                moduleName: '研判',
                modulePath: 'http://www.sohu.com1'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    deleteModule = () => {
        $.ajax({
            url: '/api/statistics/modules/scopa_test/52ff1778-b56c-484c-8a89-c536402164e3',
            method: 'delete',
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    createTag = () => {
        $.post('/api/statistics/tag/scopa_test/76ef2dbe-3651-4141-a4d1-9cf286375c97', {
            tagName: '标签2',
            Location: 'e',
            ClickCont: 'eeee',
            ClickReq: 'ceeeee'
        })
            .done((data) => {
                console.log('data=', data)
            })
    }
    
    modifyTag = () => {
        $.ajax({
            url: '/api/statistics/tag/scopa_test/76ef2dbe-3651-4141-a4d1-9cf286375c97/328e8af9-5962-434c-9e4f-02d4ea95ffbc',
            method: 'put',
            data: {
                tagName: '研判1000'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    deleteTag = () => {
        $.ajax({
            url: '/api/statistics/tag/scopa_test/76ef2dbe-3651-4141-a4d1-9cf286375c97/281ae805-f2fb-40cf-ad02-9041125e1cbd',
            method: 'delete',
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    modifyProjectIndex = () => {
        $.ajax({
            url: '/api/statistics/projectHome/scopa_test',
            method: 'put',
            data: {
                projectIndex: 'http://www.so2222.com'
            },
            success(data) {
                console.log(data)
            },
            error() {
                console.log('error')
            }
        })
    }
    
    test = () => {
        $.get('/api/abc').done((data) => {
            console.log('data=', data)
        })
    }
    
    render() {
        return (
            <div className="row">
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="修改工程的首页"
                            onClick={this.modifyProjectIndex}
                        />
                    </div>
                </fieldset>
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="删除标签"
                            onClick={this.deleteTag}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="创建标签"
                            onClick={this.createTag}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="编辑标签"
                            onClick={this.modifyTag}
                        />
                    </div>
                </fieldset>
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="获得所有模块"
                            onClick={this.getModule}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="创建模块"
                            onClick={this.createModule}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="修改模块"
                            onClick={this.modifyModule}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="删除某模块"
                            onClick={this.deleteModule}
                        />
                    </div>
                </fieldset>
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3">
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="创建日志"
                            onClick={this.createLog}
                        />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="获得日志列表"
                        onClick={this.getLogList}
                    />
                    </div>
                </fieldset>
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="删除工程配置"
                        onClick={this.deleteProjectConfig}
                    />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="修改工程配置"
                        onClick={this.modifyProjectConfig}
                    />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="获得工程配置"
                        onClick={this.getProjectConfig}
                    />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="创建工程日志配置"
                        onClick={this.createProjectConfig}
                    />
                    </div>
                </fieldset>
                <fieldset style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="修改部署地址"
                        onClick={this.modifyDeployUrls}
                    />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="创建部署地址"
                        onClick={this.saveDeployUrls}
                    />
                    </div>
                    <div className="col-md-3"><input
                        type="button"
                        className="btn btn-primary"
                        value="获得部署地址"
                        onClick={this.getDeployUrls}
                    />
                    </div>
                </fieldset>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="test"
                    onClick={this.test}
                />
                </div>
                
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="检查权限"
                    onClick={this.authorityCheck}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="重置密码"
                    onClick={this.resetPwd}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="修改密码"
                    onClick={this.modifyPwd}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="登录"
                    onClick={this.login}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="下载日志列表"
                    onClick={this.downloadLogList}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="获得用户列表"
                    onClick={this.getUserList}
                />
                </div>
                <div className="col-md-3"><input
                    type="button"
                    className="btn btn-primary"
                    value="获得工程列表"
                    onClick={this.getProjectList}
                />
                </div>
                <div className="col-md-3">
                    <input
                        type="button"
                        className="btn btn-primary"
                        value="跨域获得服务时间"
                        onClick={this.getServerTime}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="button"
                        className="btn btn-primary"
                        value="获得服务时间"
                        onClick={this.getTime}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(withRouter(ValidatorView))
