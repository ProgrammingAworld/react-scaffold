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
import LoginView from '../login/views/MainLoginView';
import HomeView from '../home/views/MainHomeView';
import ApplicationView from '../application/views/MainApplicationView';
import MainJudgedView from '../judged/views/MainJudgedView';
import RetrievalView from '../retrieval/views/MainRetrievalView';
import ArchivesView from '../archives/views/MainArchivesView';
import CooperationView from '../cooperation/views/MainCooperationView';

import TodoMainView from '../todos/views/TodoMainView';

export default class RouterConfig{
    init(){
        let store = storeCreateByReducer(reducers);
        let history = historyCreateByStore(store);
        let routes =
            <Route path="/" component={MainAppView}>
                <IndexRoute component={LoginView}/>
                <Route path="login" component={LoginView} />
                <Route path="home" component={HomeView} />
                <Route path="appliction" component={ApplicationView} />
                <Route path="retrieval" component={RetrievalView} />
                <Route path="judged" component={MainJudgedView} />
                <Route path="archives" component={ArchivesView} />
                <Route path="cooperation" component={CooperationView} />
                <Route path="todos" component={TodoMainView} />
            </Route>;

        ReactDOM.render(
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>,
            document.querySelector('#container')
        )
    }
}