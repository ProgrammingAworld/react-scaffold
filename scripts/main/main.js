/**
 * Created by anchao on 2015/12/7.
 */
import Tools from './Tools';

class Main{
    init(){
        this.gotoPage();
        this.event();
    }

    event(){
        //全局错误处理
        $(document).ajaxError(function(event, request, settings) {
            //alert("Error requesting page " + settings.url);
        });
    }

    gotoPage(){
        var pathName=Tools.getPathname().replace('/','').replace(new RegExp(".html$"),'');
        var mName=pathName?pathName:'index';
        config.pages[mName].init();
    }
}

export default Main;
