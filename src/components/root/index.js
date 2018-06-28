/**
 * Created by anchao on 2016/7/27.
 */
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
    React,
    Route,
    Redirect,
    Switch,
    hot
} from 'framework/Util'
import config from 'conf'
import Dialog from 'framework/dialog/container'
import Loading from 'framework/loading/container'

const { url } = config

@DragDropContext(HTML5Backend)
class RootRoutesView extends React.Component {
    render() {
        return (
            <div className="containerchild">
                <Switch>
                    <Route path={url.root} exact render={() => <Redirect to={url.login.path} />} />
                    <Route path={url.login.path} component={url.login.component} />
                    <Route path={url.app.root.path} component={url.app.root.component} />
                    <Route component={url.notFind} />
                </Switch>
                <Dialog />
                <Loading />
            </div>
        )
    }
}

export default hot(module)(RootRoutesView)
