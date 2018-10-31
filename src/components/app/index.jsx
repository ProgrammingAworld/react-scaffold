/**
 * 功能：受限组件入口
 * 作者：安超
 * 日期： 2018/3/19
 */
import { lazyload } from 'framework'
import {
    React,
    PureComponent,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'framework/Util'
import config from 'conf'
import Header from '../header'

class App extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loadedUserInfo: false
        }
    }

    componentDidMount() {
        const { getUserInfo } = this.props
        getUserInfo()
            .then(() => {
                this.setState({
                    loadedUserInfo: true
                })
            })
    }

    render() {
        const { match: { url }, username, logout } = this.props
        const { loadedUserInfo } = this.state
        
        if (loadedUserInfo) {
            if (username.length === 0) {
                return <Redirect to={config.url.login.path} />
            }

            return (
                <div id="chief">
                    <Header
                        username={username}
                        logout={logout}
                    />
                    <Switch>
                        <Route path={config.url.app.todos.path} component={lazyload(import('@/todos/components/main'))} />
                        <Route path={config.url.app.others.path} component={lazyload(import('@/others/main'))} />
                        <Route path={url} exact render={() => <Redirect to={config.url.app.todos.path} />} />
                    </Switch>
                </div>
            )
        }

        return null
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

export default App
