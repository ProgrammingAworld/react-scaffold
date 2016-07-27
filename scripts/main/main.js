/**
 * Created by anchao on 2015/12/7.
 */
import {
    $,
    Tools,
} from '../common/Util';
import RouterConfig from './RouterConfig';

class Main {
    init() {
        new RouterConfig().init();
        this.event();
    }

    closeLoading() {
        var loadingInstance = dialog.getCurrent();
        if (loadingInstance && loadingInstance.id == "loadingDiv") {
            loadingInstance.close().remove();
        }
    }

    event() {
        this.globalEvent();
    }

    globalEvent() {
        //全局控制左右键
        $(document).on('click', function (e) {

        }).on('contextmenu', function () {

        });

        //窗口尺寸变化时执行reload
        $(window).on('resize', function () {

        });

        //全局loading画面及错误处理
        $(document).ajaxSend(() => {
            //如果没有loading画面，一个界面只有一个loading动画时
            // var loadingInstance = dialog.getCurrent();
            // if(loadingInstance == null || loadingInstance&&loadingInstance.id != "loadingDiv"){
            //     dialog.loading();
            // }
        }).ajaxSuccess((event, XMLHttpRequest, ajaxOptions) => {
            // var oRes = JSON.parse(XMLHttpRequest.responseText);
            //
            // //统一处理错误提示
            // if(!oRes.success){
            //     //特殊处理登录页
            //     if(ajaxOptions.url == '/bus/user/info'&&location.pathname.endsWith('login.html')){
            //         return;
            //     }
            //
            //     //关闭Loading画面
            //     this.closeLoading();
            //
            //     if(ajaxOptions.url != '/bus/login'){
            //         dialog.alert(oRes.error.msg,'warning');
            //     }
            // }
        }).ajaxError((event, request, settings) => {
            // console.log("Error requesting page " + settings.url);
            //关闭Loading画面
            // this.closeLoading();
            // dialog.alert('当前服务不可用！','warning');
        }).ajaxStop(() => {
            // console.log('stop');
            // this.closeLoading();
        });
    }

    gotoPage() {
        let sPathName = Tools.getPathname().replace('/', '').replace(new RegExp(".html$"), '');
        this.sHTMLName = sPathName ? sPathName : 'login';
        config.pages[this.sHTMLName].init();
    }
}

export default Main;
