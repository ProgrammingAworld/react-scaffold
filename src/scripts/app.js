/**
 * Created by anchao on 2015/12/7.
 */
import 'babel-polyfill'
import {
    React,
    ReactDOM,
    Provider,
    Router,
    createHistory,
    AppContainer
} from 'common/Util'
import RootRoutesView from 'common/views/RootRoutesView'
import store from './store'

const history = createHistory()
const oContainer = document.querySelector('#container')

class Main {
    init() {
        this.render(RootRoutesView)
        this.event()
        
        if (module.hot && process.env.NODE_ENV === 'development') {
            module.hot.accept('./common/views/RootRoutesView', () => {
                const NextComponent = require('./common/views/RootRoutesView').default // eslint-disable-line
                this.render(NextComponent)
            })
        }
    }
    
    render(Component) {
        ReactDOM.render(
            <AppContainer warnings={false}>
                <Provider store={store}>
                    <Router hashHistory={history}>
                        <Component />
                    </Router>
                </Provider>
            </AppContainer>,
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
        window.addEventListener('beforeunload', (e) => {
            const msg = '确定要离开吗？'
            e.returnValue = msg
            console.log(msg)
            return msg
        }, false)
        
        return this
    }
}

new Main().init()
