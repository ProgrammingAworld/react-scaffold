/**
 * Created by anchao on 2016/6/2.
 */

let CreateProjectView = React.createClass({
    forbidSpace:function (e) {
        if(e.which == 32){
            e.preventDefault();
        }
    },
    render:function () {
        let name = this.props.name;
        let bDisabled = this.props.disabled;

        return (
            <form className="form-horizontal" id="create-newproject">
                <div className="form-group">
                    <label className="col-sm-2 control-label">DAG名称</label>
                    <div className="col-sm-10">
                        <input id="project-name" onKeyDown={this.forbidSpace} type="text" className="form-control" defaultValue={name} placeholder="请输入DAG名称" disabled={bDisabled} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">版本号</label>
                    <div className="col-sm-10">
                        <input id="project-version" onKeyDown={this.forbidSpace} type="text" defaultValue="draft" className="form-control" placeholder="请输入版本号" />
                    </div>
                </div>
            </form>
        );
    }
});

export default CreateProjectView;