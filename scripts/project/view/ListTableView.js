/**
 * Created by anchao on 2016/5/26.
 */
let ListTableView = React.createClass({
    render:function () {
        let sTbody = <tr><td colSpan="5" className="isEmpty">暂时没有数据……</td></tr>;
        return (
            <table className="table grid" id="project-list-table">
                <thead>
                <tr>
                    <th className="list-title">程序名称</th>
                    <th className="list-fixed-100">&nbsp;</th>
                    <th className="list-fixed-100">运行状态</th>
                    <th className="list-datetime">创建时间</th>
                    <th className="list-datetime2">修改时间</th>
                </tr>
                </thead>
                <tbody>
                {sTbody}
                </tbody>
            </table>
        )
    }
});

export default ListTableView;