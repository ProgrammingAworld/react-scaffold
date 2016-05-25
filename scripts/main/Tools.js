/**
 * Created by Anchao on 2015/8/3.
 */

//公共工具类
class Tools {
    static routerM(opts, defaultexe) {
        var Workspace = Backbone.Router.extend(opts);
        router = new Workspace();
        Backbone.history.start();

        //默认执行
        if (this.getHash().indexOf('#') == -1) {
            this.setHash(defaultexe);
        } else {
        }
    }

    static setHash(v) {
        router.navigate(v, {trigger: true});
        // location.hash = v;
    }

    static getHash() {
        return location.hash;
    }

    static getPathname() {
        return location.pathname;
    }

    static exeCb(fnCb) {
        if (fnCb && typeof fnCb === "function") {
            fnCb();
        }
    }

    static convertDate2FormatStr(oDate, format) {
        var o = {
            "M+": oDate.getMonth() + 1, //month
            "d+": oDate.getDate(), //day
            "h+": oDate.getHours(), //hour
            "m+": oDate.getMinutes(), //minute
            "s+": oDate.getSeconds(), //second
            "q+": Math.floor((oDate.getMonth() + 3) / 3), //quarter
            "S": oDate.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }

        return format;
    }
}

export default Tools;