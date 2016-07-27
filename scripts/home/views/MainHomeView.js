/**
 * Created by anchao on 2016/7/26.
 */

import {React, connect, PureRenderMixin,createSelector} from '../../common/Util';
import actionCreator from '../actions/actionCreator';

const MainHomeView = React.createClass({
    mixins:[PureRenderMixin],
    componentDidMount: function () {
        let {dispatch} = this.props;
        //触发得到所有数据
        dispatch(actionCreator.getAll());
    },
    render: function () {
        let {dispatch, list} = this.props;

        return (
            <div>Home_list:
                {list.map((item, index)=> {
                    return <div key={index}>{item.get('text')}</div>
                })}
            </div>
        );
    }
});

const home = state => {
    return state.home_list;
};

const getHome = createSelector([home], (home)=> {
    return {
        list: home
    }
});

export default connect(getHome)(MainHomeView);