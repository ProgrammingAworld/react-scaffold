/**
 * Created by anchao on 2016/7/26.
 */

import {React, connect, PureRenderMixin,createSelector} from '../../common/Util';
import actionCreator from '../actions/actionCreator';

const MainCooperationView = React.createClass({
    mixins:[PureRenderMixin],
    componentDidMount: function () {
        let {dispatch} = this.props;
        //触发得到所有数据
        dispatch(actionCreator.getAll());
    },
    render: function () {
        let {dispatch, list} = this.props;
        return (
            <div>cooperation_list:
                {list.map((item, index)=> {
                    return <div key={index}>{item.get('text')}</div>
                })}
            </div>
        );
    }
});

const cooperation = state => {
    return state.cooperation_list;
};

const getCooperation = createSelector([cooperation], (cooperation)=> {
    return {
        list: cooperation
    }
});

export default connect(getCooperation)(MainCooperationView);