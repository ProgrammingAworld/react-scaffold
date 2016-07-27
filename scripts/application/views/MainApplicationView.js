/**
 * Created by anchao on 2016/7/26.
 */

import {React, PureRenderMixin,connect, createSelector} from '../../common/Util';
import actionCreator from '../actions/actionCreator';

const MainApplicationView = React.createClass({
    mixins:[PureRenderMixin],
    componentDidMount: function () {
        let {dispatch} = this.props;
        //触发得到所有数据
        dispatch(actionCreator.getAll());
    },
    render: function () {
        let {dispatch, list} = this.props;
        return (
            <div>application_list:
                {list.map((item, index)=> {
                    return <div key={index}>{item.get('text')}</div>
                })}
            </div>
        );
    }
});

const appliction = state => {
    return state.appliction_list;
};

const getAppList = createSelector([appliction], (appliction)=> {
    return {
        list: appliction
    }
});

export default connect(getAppList)(MainApplicationView);