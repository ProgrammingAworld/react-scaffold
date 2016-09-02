/**
 * Created by anchao on 2016/7/27.
 */
import {
    React,
    ReactDOM,
    Provider,
    Router,
    Route,
    IndexRoute,
    storeCreateByReducer,
    historyCreateByStore
} from '../common/Util';
import {reducers} from './reducers';
import MainAppView from './views/MainAppView';
import MainHomeView from './views/MainHomeView';
import LoginView from '../login/views/MainLoginView';
import TodoMainView from '../todos/views/TodoMainView';

export default class RouterConfig{
    init(){
        let store = storeCreateByReducer(reducers);
        let history = historyCreateByStore(store);
        let routes =
            <Route path="/" component={MainAppView}>
                <IndexRoute component={LoginView}/>
                <Route path="login" component={LoginView} />
                <Route path="main" component={MainHomeView}>
                    <IndexRoute component={TodoMainView}/>
                    <Route path="todos" component={TodoMainView} />
                </Route>
            </Route>;

        ReactDOM.render(
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>,
            document.querySelector('#container')
        );
    }
}