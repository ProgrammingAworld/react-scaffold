import 'noty/js/noty/packaged/jquery.noty.packaged.min';

class Login {
    init() {
        this.event();
    }

    event() {
        $('.login-submit').on('click',function () {
           location.href = 'project.html';
        });
    }
}

export default Login;

