/**
 * Created by anchao on 2016/7/26.
 */
import {React, connect, PureRenderMixin, createSelector, Link} from '../../common/Util';
import HeaderView from './HeaderView';

const MainAppView = React.createClass({
    mixins: [PureRenderMixin],
    contextTypes: {
        router: React.PropTypes.object
    },
    render: function () {
        let pathname = this.props.pathname;
        let chiefCls = "";
        let result = null;

        if (pathname == "/") {
            result = <div id="chief" className="login">{this.props.children}</div>;
        } else {
            chiefCls = pathname.substring(1);
            result =
                <div className="hasmain">
                    <HeaderView/>
                    <div id="chief" className={chiefCls}>{this.props.children}</div>
                </div>;
        }

        return (<div className="containerchild">{result}</div>);
    }
});

const pathname = state => {
    return state.routing.locationBeforeTransitions.pathname;
};

const appData = createSelector([pathname], (pathname)=> {
    return {
        pathname: pathname
    }
});

export default connect(appData)(MainAppView);