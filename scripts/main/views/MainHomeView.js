/**
 * Created by anchao on 2016/7/26.
 */
import {React,connect, createSelector, Link} from '../../common/Util';
import ReactComponentBase from '../../base/ReactComponentBase';
import HeaderView from './HeaderView';

class MainAppView extends ReactComponentBase {
    constructor(props) {
        super(props);
    }

    render() {
        let clsName = this.props.pathname.split('/')[2];
        return (
            <div>
                <HeaderView />
                <div className={clsName}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const pathname = state => {
    return state.routing.locationBeforeTransitions.pathname;
};

const appData = createSelector([pathname], (pathname) => {
    return {
        pathname: pathname
    }
});

export default connect(appData)(MainAppView);