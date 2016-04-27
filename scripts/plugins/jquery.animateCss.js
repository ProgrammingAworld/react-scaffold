/**
 * Created by anchao on 2016/4/27.
 */

(function ($) {
    var old = $.fn.animateCss;
    
    function AnimateCss(element,options) {
        this.ver = '1.0';
        this.$element = $(element);
        this.options = options;
        this.init();
    }
    
    AnimateCss.prototype = {
        constructor:AnimateCss,
        init:function () {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var animationName = this.options;
            this.$element.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    };
    
    $.fn.animateCss = function (options) {
        this.each(function () {
            new AnimateCss(this,options);
        })
    };

    $.fn.animateCss.noConflict = function() {
        $.fn.animateCss = old;
        return this;
    };
})(jQuery);