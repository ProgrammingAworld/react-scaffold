/**
 * Created by anchao on 2015/12/7.
 */
import 'babel-polyfill'
import {
    React,
    ReactDOM,
    Provider,
    Router,
    createHistory
} from 'common/Util'
import RootRoutesView from 'common/views/RootRoutesView'
import store from './common/store'

const history = createHistory()
const oContainer = document.querySelector('#container')

ReactDOM.render(
    <Provider store={store}>
        <Router hashHistory={history}>
            <RootRoutesView />
        </Router>
    </Provider>,
    oContainer
)

if (process.env.NODE_ENV === 'production') {
    window.addEventListener('beforeunload', (e) => {
        const msg = '确定要离开吗？'
        e.returnValue = msg
        return msg
    }, false)
}
