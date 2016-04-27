import 'noty/js/noty/packaged/jquery.noty.packaged.min';
import '../plugins/jquery.animateCss';

import Parent from './Parent.jsx';

class Login {
    init() {
        this.event();
    }

    event() {
        //测试按钮
        $('#btn_Once').click(function () {
            ReactDOM.render( < Parent / >, document.getElementById('first'));
        });

        //测试dialog
        $('#btn_dialog').click(function () {
            $('#scroll').animateCss('lightSpeedIn');

            noty({
                layout: 'center',
                theme: 'defaultTheme', // or 'relax'
                type: 'confirm',
                text: '<b>测试</b>'.repeat(100), // can be html or string
                dismissQueue: true, // If you want to use queue feature set this true
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                animation: {
                    open: 'animated lightSpeedIn', // or Animate.css class names like: 'animated bounceInLeft'
                    close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
                    easing: 'swing',
                    speed: 500 // opening & closing animation speed
                },
                timeout: false, // delay for closing event. Set false for sticky notifications
                force: false, // adds notification to the beginning of queue when set to true
                modal: false,
                maxVisible: 5, // you can set max visible notification for dismissQueue true option,
                killer: false, // for close all notifications before show
                closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                callback: {
                    onShow: function () {
                    },
                    afterShow: function () {
                    },
                    onClose: function () {
                    },
                    afterClose: function () {
                    },
                    onCloseClick: function () {
                    },
                },
                buttons: [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {

                            // this = button element
                            // $noty = $noty element

                            $noty.close();
                            noty({text: 'You clicked "Ok" button', type: 'success'});
                        }
                    },
                    {
                        addClass: 'btn btn-danger',
                        text: 'Cancel',
                        onClick: function ($noty) {
                            $noty.close();
                            noty({text: 'You clicked "Cancel" button', type: 'error'});
                        }
                    }
                ] // an array of buttons
            })
        });
    }
}

export default Login;

