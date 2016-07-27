/**
 * Created by anchao on 2016/7/26.
 */

import {React, dialog, PureRenderMixin, connect, createSelector} from '../../common/Util';
import actionCreator from '../actions/actionCreator';

const MainLoginView = React.createClass({
    mixins: [PureRenderMixin],
    contextTypes: {
        router: React.PropTypes.object
    },
    checkedChange: function (e) {
        let {dispatch} = this.props;
        let value = e.currentTarget.value;

        dispatch(actionCreator.setUserType(value))
    },
    PKIlogin: function () {
        let {dispatch} = this.props;
        dispatch(actionCreator.PKIlogin());
    },
    login: function () {
        let {dispatch, type} = this.props;
        let username = this.refs.username.value.trim();
        let pwd = this.refs.pwd.value.trim();

        if (username.length == 0) {
            dialog.alert('用户名不能为空');
            return;
        }

        if (pwd.length == 0) {
            dialog.alert('密码不能为空');
            return;
        }

        dispatch(actionCreator.login(username, pwd, type, ()=> {
            this.context.router.push('/home');
        }));
    },
    render: function () {
        let {dispatch, type} = this.props;

        return (
            <div>
                <div><input type="text" ref="username" className="input_user"/></div>
                <div><input type="password" ref="pwd" className="input_pwd"/></div>
                <div>
                    <button className="form-control btn-default btn-info" onClick={this.PKIlogin}>PKI登录</button>
                    <button className="form-control btn-default btn-info" onClick={this.login}>登录</button>
                </div>
                <div>
                    <input type="radio" name="usertype" value="0" onChange={this.checkedChange}
                           checked={type == "0" ? true : false}/>用户
                    <input type="radio" name="usertype" value="1" onChange={this.checkedChange}
                           checked={type == "1" ? true : false}/>管理员
                    <a href="http://k1268.mlamp.co/tuning/qbscopa16.cer" target="_blank">下载证书</a>
                </div>
            </div>
        );
    }
});

const loginType = state => {
    return state.login_type;
};

const getLoginType = createSelector([loginType], (loginType)=> {
    return {
        type: loginType
    }
});

export default connect(getLoginType)(MainLoginView);