/**
 * Created by anchao on 2016/6/29.
 */

import {React, ReactDOM, storeCreateByReducer,Provider} from '../common/Util';
import TodoMainView from './views/TodoMainView';
import reducers from './reducers/reducers';

export default class Todos {
    init() {
        let store = storeCreateByReducer(reducers);

        ReactDOM.render(
            <Provider store={store}>
                <TodoMainView />
            </Provider>,
            document.querySelector('#chief')
        );
    }
}