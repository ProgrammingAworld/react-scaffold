/**
 * Created by anchao on 2016/4/28.
 */

(function ($) {
    var old = $.fn.loadingPage;

    function LoadingPage(actionName) {
        this.ver = '1.0';
        this.actionName = actionName;
        this.done = false;
        this.loadEle = null;
        this.spanTime = 300;
        this.HTML = '<div id="loading"><div class="progress"><div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;" class="progress-bar progress-bar-success progress-bar-striped active">0%</div></div></div>';
        this.init();
    }

    LoadingPage.prototype = {
        constructor: LoadingPage,
        init: function () {
            if(this.loadEle == null){
                var html = this.HTML;
                $(document.body).prepend(html);
                this.loadEle = $('#loading');
            }

            switch (this.actionName) {
                case 'start':
                    this.start();
                    break;
                case 'stop':
                    this.stop();
                    break;
                case 'done':
                    this.done = true;
                    this.spanTime = 30;
                    this.start();
                    break;
                default:
                    break;
            }
        },
        setActionName:function (actionName) {
            this.actionName = actionName;
        },
        start: function () {
            this.stop();
            var spanTime = this.spanTime;
            this.loadEle.data('loadingtimer',setInterval(this.animate.bind(this),spanTime));
        },
        stop: function () {
            clearInterval(this.loadEle.data('loadingtimer'));
        },
        animate: function () {
            var $progressbar = this.loadEle.find('.progress-bar');
            var nValue = parseInt($progressbar.attr('aria-valuenow'), 10);
            nValue++;
            $progressbar.attr('aria-valuenow', nValue).css('width', nValue + '%').text(nValue + '%');

            //手动暂停，避免页面数据还求加载完成,loading完成
            if (nValue == 96&&!this.done) {
                this.stop();
            }

            if (nValue == 100) {
                this.done = true;
                this.stop();

                //结束画面停顿一下
                setTimeout(function () {
                    this.loadEle.animateCss('fadeOutUp', function () {
                        $(this).addClass('hide');
                    });
                }.bind(this),800);
            }
        }
    };

    $.fn.loadingPage = function (actionName) {
        var instance = this.data('loadingpage');
        if(!instance){
            instance = new LoadingPage(actionName);
            this.data('loadingpage',instance);
        }else {
            instance.setActionName(actionName);
            instance.init();
        }
    };

    $.fn.loadingPage.noConflict = function () {
        $.fn.loadingPage = old;
        return this;
    };
})(jQuery);