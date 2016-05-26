/**
 * Created by anchao on 2015/12/7.
 */
import MenuView from './MenuView';

class Main{
    init(){
        this.gotoPage();
        this.event();
    }

    event(){
        let oMenu = document.getElementById('header');
        //窗口尺寸变化时执行reload
        $(window).on('resize', function() {
            //window.location.reload();
        });

        //全局错误处理
        $(document).ajaxStart(function () {
            //如果没有loading画面，一个界面只有一个loading动画时
            var loadingInstance = dialog.getCurrent();
            if(loadingInstance&&loadingInstance.id!="loadingDiv"){
                dialog.loading();
            }
        }).ajaxSuccess(function (event, XMLHttpRequest, ajaxOptions) {
            var oRes = JSON.parse(XMLHttpRequest.responseText);

            //统一处理错误提示
            if(!oRes.success){
                //特殊处理登录页
                if(ajaxOptions.url == '/bus/user/info'&&location.pathname.endsWith('login.html')){
                    return;
                }

                dialog.alert(oRes.error.msg);
            }
        }).ajaxError(function(event, request, settings) {
            console.log("Error requesting page " + settings.url);
            dialog.alert('当前服务不可用！');
        }).ajaxStop(function () {
            console.log('stop');
            //一个界面拥有多个动画时递归移除loading
            function _removeLoad(instance) {
                if(instance){
                    instance.close().remove();
                    _removeLoad(dialog.getCurrent());
                }else {
                    console.log('removeload complete');
                }
            }

            var loadingInstance = dialog.getCurrent();
            if(loadingInstance&&loadingInstance.id=="loadingDiv"){
                loadingInstance.close().remove();
            }

            // _removeLoad(loadingInstance);
        });

        if(oMenu){
            ReactDOM.render(<MenuView active={this.mName} />,document.getElementById('header'));
        }
    }

    gotoPage(){
        var pathName=Tools.getPathname().replace('/','').replace(new RegExp(".html$"),'');
        this.mName=pathName?pathName:'index';
        config.pages[this.mName].init();
    }
}

export default Main;
