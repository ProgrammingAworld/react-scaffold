/**
 * Created by anchao on 2016/7/26.
 */

import { React, connect, withRouter, createSelector } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import actionCreator from '../actions/actionCreator'

class LoginMainView extends ReactComponentBase {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log(Date.now())

    //用户名获得焦点11
    this.username.focus()

    const particles = {
      'particles': {
        'number': {
          'value': 50,
          'density': {
            'enable': true,
            'value_area': 800,
          },
        },
        'color': {
          'value': '#b8d2f6',
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000',
          },
          'polygon': {
            'nb_sides': 5,
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100,
          },
        },
        'opacity': {
          'value': 1,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 1,
            'sync': false,
          },
        },
        'size': {
          'value': 8,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false,
          },
        },
        'line_linked': {
          'enable': true,
          'distance': 250,
          'color': '#b8d2f6',
          'opacity': 1,
          'width': 2,
        },
        'move': {
          'enable': true,
          'speed': 1,
          'direction': 'none',
          'random': false,
          'straight': false,
          'out_mode': 'out',
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200,
          },
        },
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'repulse',
          },
          'onclick': {
            'enable': false,
            'mode': 'push',
          },
          'resize': true,
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1,
            },
          },
          'bubble': {
            'distance': 200,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3,
          },
          'repulse': {
            'distance': 200,
          },
          'push': {
            'particles_nb': 4,
          },
          'remove': {
            'particles_nb': 2,
          },
        },
      },
      'retina_detect': true,
      'config_demo': {
        'hide_card': false,
        'background_color': '#b61924',
        'background_image': '',
        'background_position': '50% 50%',
        'background_repeat': 'no-repeat',
        'background_size': 'cover',
      },
    }
    particlesJS('particles-js', particles)
  }

  checkedChange = e => {
    let {dispatch} = this.props
    let value = e.currentTarget.getAttribute('value')
    dispatch(actionCreator.setUserType(value))
  }

  PKIlogin = () => {
    let {dispatch} = this.props
    dispatch(actionCreator.PKIlogin())
  }

  login = () => {
    let {dispatch, type} = this.props
    let username = this.username.value.trim()
    let pwd = this.pwd.value.trim()

    if (username.length == 0) {
      this.username.focus()
      dispatch(actionCreator.setError('请输入用户名'))
      return
    }

    if (pwd.length == 0) {
      this.pwd.focus()
      dispatch(actionCreator.setError('请输入密码'))
      return
    }

    //清空错误信息
    dispatch(actionCreator.setError(''))

    //登录检验
    // dispatch(actionCreator.login(username, pwd, type, ()=> {
    //     this.gotoUrl('/todos');
    //     dispatch(actionCreator.setUserName(username));
    // }));

    this.gotoUrl('/app')
    dispatch(actionCreator.setUserName('admin'))
  }

  gotoUrl = url => {
    this.props.history.replace(url)
  }

  render () {
    let {dispatch, type, error} = this.props
    let errorCls = 'errors pull-right invisible'
    if (error.length > 0) {
      errorCls = 'errors pull-right'
    }

    return (
      <div id='chief'>
        <div className='login'>
          <div id='particles-js'></div>
          <div className='loginmain'>
            <div className='input-group'>
              <input type='text' ref={input=>this.username=input} className='login-user'
                     onKeyDown={this.forbitBlackSpace}/>
              <input type='password' ref={input=>this.pwd=input} className='login-pwd'/>
              <i className='fa fa-user-o fa-lg'></i>
              <i className='fa fa-bell-o fa-lg pwdico'></i>
            </div>
            <div className='login-btn'>
              <div className={errorCls}><i
                className='fa fa-exclamation-circle fa-lg'></i>{error}</div>
              <div className='clearfix'></div>
              <button className='login_button pull-left hide'
                      onClick={this.PKIlogin}>PKI登录
              </button>
              <button className='login_button pull-right' onClick={this.login}>
                登录11
              </button>
              <div className='clearfix'></div>
              <div className='rolerow'>
                <div className='pull-left'>
                  <div className='pull-left role'><span value='0'
                                                        onClick={this.checkedChange}
                                                        className={type == '0'
                                                          ? 'checked'
                                                          : ''}></span>用户
                  </div>
                  <div className='pull-left role'><span value='1'
                                                        onClick={this.checkedChange}
                                                        className={type == '1'
                                                          ? 'checked'
                                                          : ''}></span>管理员
                  </div>
                </div>
                <div className='pull-right hide'><a href='javascript:;'
                                                    target='_blank'>下载证书</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const loginType = state => {
  return state.login_type
}
const loginError = state => {
  return state.login_error
}

const getLoginType = createSelector([loginType, loginError],
  (loginType, loginError) => {
    return {
      type: loginType,
      error: loginError,
    }
  })

export default withRouter(connect(getLoginType)(LoginMainView))