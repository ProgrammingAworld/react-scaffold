import config from 'conf'
import { React, PropTypes, noop } from 'common/Util'
import classNames from 'classnames/bind'
import ReactComponentBase from 'base/ReactComponentBase'
import particlesJS from 'plugins/particles'

const { constant } = config

class Login extends ReactComponentBase {
    componentDidMount() {
        // 用户名获得焦点11
        this.username.focus()
        particlesJS('particles-js', constant.particles)
    }
    
    checkedChange = (e) => {
        const value = e.currentTarget.getAttribute('value')
        this.props.setUserType(value)
    }
    
    PKIlogin = () => {
        this.props.PKIlogin()
    }
    
    login = () => {
        const {
            type, setError, setUserName, login
        } = this.props
        const username = this.username.value.trim()
        const pwd = this.pwd.value.trim()
        
        if (username.length === 0) {
            this.username.focus()
            setError('请输入用户名!')
            return
        }
        
        if (pwd.length === 0) {
            this.pwd.focus()
            setError('请输入密码!')
            return
        }
        
        // 清空错误信息
        setError('')
        
        // 登录检验
        login({ params: { username, pwd, type } }).then((res) => {
            if (res.statusCode === 200) {
                this.gotoUrl('/app')
                setUserName(username)
            }
        })
    }
    
    gotoUrl = (url) => {
        this.props.history.replace(url)
    }
    
    render() {
        const { type, error } = this.props
        const errorCls = classNames('errors', 'pull-right', { invisible: error.length <= 0 })
        
        return (
            <div id="chief">
                <div className="login">
                    <div id="particles-js" />
                    <div className="loginmain">
                        <div className="input-group">
                            <input
                                type="text"
                                ref={(username) => {
                                    this.username = username
                                }}
                                className="login-user"
                                onKeyDown={this.forbitBlackSpace}
                            />
                            <input
                                type="password"
                                ref={(pwd) => {
                                    this.pwd = pwd
                                }}
                                className="login-pwd"
                            />
                            <i className="fa fa-user-o fa-lg" />
                            <i className="fa fa-bell-o fa-lg pwdico" />
                        </div>
                        <div className="login-btn">
                            <div className={errorCls}><i
                                className="fa fa-exclamation-circle fa-lg"
                            />{error}
                            </div>
                            <div className="clearfix" />
                            <button
                                className="login_button pull-left hide"
                                onClick={this.PKIlogin}
                            >PKI登录
                            </button>
                            <button className="login_button pull-right" onClick={this.login}>
                                登录
                            </button>
                            <div className="clearfix" />
                            <div className="rolerow">
                                <div className="pull-left">
                                    <div className="pull-left role"><span
                                        role="presentation"
                                        value="0"
                                        onClick={this.checkedChange}
                                        className={type === '0'
                                            ? 'checked'
                                            : ''}
                                    />用户
                                    </div>
                                    <div className="pull-left role"><span
                                        role="presentation"
                                        value="1"
                                        onClick={this.checkedChange}
                                        className={type === '1'
                                            ? 'checked'
                                            : ''}
                                    />管理员
                                    </div>
                                </div>
                                <div className="pull-right hide">
                                    <span>下载证书</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    type: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    setUserType: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setUserName: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    PKIlogin: PropTypes.func,
}

Login.defaultProps = {
    PKIlogin: noop
}

export default Login
