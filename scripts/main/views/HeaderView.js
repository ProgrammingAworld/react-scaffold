/**
 * Created by anchao on 2016/6/29.
 */
import {React,Link,PureRenderMixin} from '../../common/Util';

let HeaderView = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        return (
            <div id="header" className="clearfix">
                <div className="pull-left" id="logo"></div>
                <div className="pull-left navigation">
                    <ul role="nav" className="list-unstyled list-inline">
                        <li><Link to="/home" activeClassName="active">首页</Link></li>
                        <li><Link to="/appliction" activeClassName="active">应用</Link></li>
                        <li><Link to="/retrieval" activeClassName="active">检索</Link></li>
                        <li><Link to="/judged" activeClassName="active">研判</Link></li>
                        <li><Link to="/archives" activeClassName="active">档案</Link></li>
                        <li><Link to="/cooperation" activeClassName="active">协作</Link></li>
                    </ul>
                </div>
                <div className="pull-right"></div>
            </div>
        );
    }
});

export default HeaderView;