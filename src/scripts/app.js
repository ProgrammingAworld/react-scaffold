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
import store from './store'

const history = createHistory()
const oContainer = document.querySelector('#container')

class Main {
    init() {
        this.render(RootRoutesView)
        this.event()
    }

    render(Component) {
        ReactDOM.render(
            <Provider store={store}>
                <Router hashHistory={history}>
                    <Component />
                </Router>
            </Provider>,
            oContainer
        )
    }

    closeLoading() {
        return this
    }

    event() {
        this.globalEvent()
        this.unloadModule()
    }

    globalEvent() {
        return this
    }

    unloadModule() {
        if (process.env.NODE_ENV === 'production') {
            window.addEventListener('beforeunload', (e) => {
                const msg = '确定要离开吗？'
                e.returnValue = msg
                console.log(msg)
                return msg
            }, false)
        }

        return this
    }
}

new Main().init()
