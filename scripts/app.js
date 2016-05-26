/**
 * Created by Anchao on 2015/10/23.
 */

import './main/global';

//项目js
import Main from './main/main';
import LoginMain from './login/login';
import ProjectMain from './project/ProjectMain';
import ApplicationMain from './application/ApplicationMain';

window.config={
    pages:{
        "login": new LoginMain(),
        "project":new ProjectMain(),
        "application":new ApplicationMain()
    },
    "errors":{
    },
    "isSimulate": false
};

new Main().init();