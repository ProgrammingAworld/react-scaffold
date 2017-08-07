/**
 * Created by anchao on 2016/7/26.
 */
import {React, connect, createSelector, Link} from '../../common/Util';
import ReactComponentBase from '../../base/ReactComponentBase';
import actionCreator from '../../login/actions/actionCreator';

class MainAppView extends ReactComponentBase {
    constructor(props) {
        super(props);

        /**
         * isGetting:标识当前是否正在请求用户信息，避免重复请求
         */
        this.state={
            isGetting:false
        };

        //获得当前用户信息
        this.getInfo = this.getInfo.bind(this);
        //注销
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (this.props.user.get('username').length == 0) {
            this.getInfo();
        }
    }

    componentWillReceiveProps(nextProps) {
        let oldUser = this.props.user.get('fullInfo');
        let newUser = nextProps.user.get('fullInfo');

        if(oldUser&&!oldUser.equals(newUser)){
            this.getInfo();
        }
    }

    getInfo() {
        let {dispatch} = this.props;
        let pathname = this.context.router.location.pathname.toLowerCase();
        let rememberMe = window.localStorage.getItem('rememberMe')=='true';

        //重置密码界面不需要获得用户信息！
        if(!pathname.startsWith('/resetPassword/')&&!this.state.isGetting){
            //当前正在执行获得用户信息的操作
            this.setState({isGetting:true});

            dispatch(actionCreator.info((status, result) => {
                //当前获得用户信息的操作执行完成
                this.setState({isGetting:false});

                if (status) {
                    //在登录页，免登录是否选中，选择是否自动跳转到内页
                    if (pathname == "/") {
                        //根据是否免登录，选择是否跳转,根据不同角色跳转到不同界面
                        if(rememberMe){
                            if (result.role == 'user') {
                                this.context.router.replace("/usersystem/dataview");
                            } else {
                                this.context.router.replace("/main/datamanagement");
                            }
                        }
                    } else {
                        //非登录界面，系统内部界面根据是否免登录选择是否显示内页
                        //不同角色禁止跳转到没有权限的界面
                        if (result.role == 'user') {
                            //禁止进入管理员界面
                            if(pathname.startsWith("/main/")){
                                this.context.router.replace("/usersystem/dataview");
                            }else {
                                this.context.router.replace(pathname);
                            }
                        } else {
                            //禁止进入普通用户界面
                            if(pathname.startsWith('/usersystem/')){
                                this.context.router.replace("/main/datamanagement");
                            }else {
                                this.context.router.replace(pathname);
                            }
                        }
                    }
                } else {
                    this.context.router.replace('/');
                }
            }));
        }
    }

    logout() {
        let {dispatch} = this.props;

        dispatch(actionCreator.logout((status, error) => {
            if (status) {
                //清空当前登录名和角色
                dispatch(actionCreator.setUserName("", "",{}));
                this.context.router.replace('/');
            } else {
                dialog.alert(error, 'error');
            }
        }));
    }

    render() {
        let pathname = this.context.router.location.pathname;
        let chiefCls = "";
        let childProps = {
            logout: this.logout,
            user: this.props.user
        };

        if (pathname == "/") {
            chiefCls = "login";
        } else {
            chiefCls = "others";
        }

        return (
            <div id="chief" className={chiefCls}>
                {this.props.children && React.cloneElement(this.props.children, {...childProps})}
            </div>
        );
    }
}

const user = state => {
    return state.login_username;
}

const appData = createSelector([user], (user) => {
    return {
        user
    }
});

export default connect(appData)(MainAppView);