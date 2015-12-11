/**
 * Created by Anchao on 2015/10/23.
 */

import './main/global';

//项目js
import Main from './main/main';
import LoginMain from './login/login';

window.config={
    pages:{
        "index":new LoginMain()
    },
    "errors":{
    },
    "isSimulate": false
};

new Main().init();