/**
 * Created by anchao on 2016/7/26.
 */
import {
    React,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'framework/Util'
import config from 'conf'
import ReactComponentBase from 'base/ReactComponentBase'
import Header from '../header'

class App extends ReactComponentBase {
    constructor(props){
        super(props)
        this.state = {
            loadedUseInfo: false
        }
    }

    componentDidMount() {
        this.props.getUserInfo()
            .then(() => {
                this.setState({
                    loadedUseInfo: true
                })
            })
    }

    render() {
        const { match: { url }, username, logout } = this.props
        const { loadedUseInfo } = this.state

        if (loadedUseInfo) {
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
                        <Route path={config.url.app.todos.path} component={config.url.app.todos.component} />
                        <Route path={config.url.app.others.path} component={config.url.app.others.component} />
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
    logout: PropTypes.func.isRequired
}

export default App
