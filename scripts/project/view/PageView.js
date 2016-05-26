/**
 * Created by anchao on 2016/5/26.
 */
let PageView = React.createClass({
    render:function () {
        return (
            <div className="page-node clearfix">
                <form className="form-inline pull-left">
                    <div className="form-group">
                        <label className="control-label">每页</label>
                        <select className="form-control pagecount" defaultValue={20}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </form>
                <div className="pull-right">
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="control-label">跳转至</label>
                            <input type="number" defaultValue={1} min="1" className="form-control pagenumber"  />
                            <span className="totalpagecount">/1</span>
                            <button type="button" className="btn btn-default pre-page">上一页</button>
                            <button type="button" className="btn btn-default next-page">下一页</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

export default PageView;