/**
 * Created by anchao on 2016/7/26.
 */
import {React, connect, PureRenderMixin, createSelector, Link} from '../../common/Util';
import HeaderView from './HeaderView';

class MainAppView extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

MainAppView.contextTypes = {
    router: React.PropTypes.object
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