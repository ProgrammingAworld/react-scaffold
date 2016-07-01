/**
 * Created by Anchao on 2016/6/29.
 */

//模块js
import Main from './main/Main';
import LoginMain from './login/Login';
import CoreMain from './core/Core';
import GraphMain from './graph/Graph';
import MapMain from './map/Map';
import FileMain from './file/File';
import CooperateMain from './cooperate/Cooperate';
import AppMain from './app/App';
import TodoMain from './todos/Todos';

window.config={
    pages:{
        "login": new LoginMain(),
        "core": new CoreMain(),
        "graph": new GraphMain(),
        "map": new MapMain(),
        "file": new FileMain(),
        "cooperate": new CooperateMain(),
        "app": new AppMain(),
        "todos": new TodoMain()
    },
    "errors":{
    }
};

new Main().init();