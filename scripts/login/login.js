import Parent from './Parent.jsx';

class Login{
    init(){
        this.event();
    }
    event(){
        //测试按钮
        $('#btn_Once').click(function(){
            ReactDOM.render(<Parent />,document.getElementById('first'));
        });
    }
}

export default Login;

