/**
 * Created by anchao on 2016/5/26.
 */

let TopRowView = React.createClass({
    render:function () {
        return (
            <div className="toptitlesec">
                <div className="pull-left">
                    <ol className="breadcrumb">
                        <li className="active">程序开发</li>
                    </ol>
                </div>
                <div className="pull-right">
                    <div className="input-group has-feedback search-whale-section">
                        <input type="text" className="form-control" placeholder="搜索工程名称..." id="project-name-search" />
                        <button className="btn btn-default btn-whaleDefault" id="project-list-button-search"><i className="icon-seach"></i></button>
                    </div>
                    <ul className="list-inline">
                        <li>
                            <button type="button" className="btn btn-default btn-whaleDefault" id="whale-project-list-button-new"><i className="icon-increase"></i>新建工程</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
});

export default TopRowView;