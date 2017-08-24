/**
 * Created by anchao on 2016/7/26.
 */
import BaseService from '../../base/ServiceBase'

export default class LoginService extends BaseService {
    /**
     * 用户登录
     * @param oSettings
     *        username: 用户名{string}
     *        password: 密码{string}
     *        type: 用户类型{string}"0"用户,"1"管理员
     * @returns {*}
     */
  static login (oSettings) {
    return this.postWithParameter('', oSettings)
  }

  static PKIlogin () {
    return this.getWithParameter('')
  }

  static checkAuthority () {
    return this.getWithParameter('')
  }

  static logout () {
    return this.getWithParameter('')
  }
}
