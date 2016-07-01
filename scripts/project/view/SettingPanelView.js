/**
 * Created by anchao on 2016/5/26.
 */
let SettingPanelView = React.createClass({
    cmdChange:function (e) {
        let newValue = e.currentTarget.value;
        let aCurOpe = this.props.currentOpe;
        let oCurVer = this.props.currentVersion;
        let aTaskQueue = oCurVer.meta.queue;
        let opeId = aCurOpe[0].id;

        if(newValue.trim().length == 0&&aTaskQueue.indexOf(opeId) != -1){
            dialog.alert('任务队列中的算子命令行不能为空','warning');
        }else {
            $('.operators').data('operatorSub').onNext({
                type: 'operatorPropschange',
                data: {opeId:opeId, props:{cmd: newValue}}
            });
        }
    },
    paramChange:function (e) {
        let opeId = this.props.currentOpe[0].id;

        $('.operators').data('operatorSub').onNext({
            type: 'operatorPropschange',
            data: {opeId:opeId, props:{param: e.currentTarget.value}}
        });
    },
    render:function () {
        let str = null;
        let queue = this.props.queue;
        let oCurVer = this.props.currentVersion;
        let aCurOpe = this.props.currentOpe;
        let disabled = true;
        let cmdCls = "form-control txtareacmd";
        let defaultFn = function (e) {
            e.preventDefault();
        };
        let fnSettings = {
            cmdChange:defaultFn,
            paramChange:defaultFn,
            cmdBlur:defaultFn
        };

        //根据状态决定是否可以编辑
        //任务队列是否在全局队列中
        if(oCurVer&&!queue.find(oVer=>{return oVer.id == oCurVer.id})){
            fnSettings.cmdChange = this.cmdChange;
            fnSettings.paramChange = this.paramChange;
            disabled = false;
        }else {
            fnSettings.cmdChange = defaultFn;
            fnSettings.paramChange = defaultFn;
            disabled = true;
        }

        //命令行不能为空
        if(aCurOpe.length>0&&$.trim(aCurOpe[0].cmd).length == 0){
            cmdCls = "form-control txtareacmd warning";
        }

        if(aCurOpe.length > 0){
            str = <div className="settinggroup">
                    <form className="form-inline">
                        <div className="form-group profilenamerow">
                            <i className="caret"></i>{aCurOpe[0].name}
                        </div>
                    </form>
                    <fieldset className="idsection">
                        <legend>
                            <div className="sidebarpanel-column-title">算子ID</div>
                        </legend>
                        <div className="form-group" style={{paddingLeft:12,marginBottom:5}}>ID:{aCurOpe[0].id}</div>
                    </fieldset>
                    <fieldset className="cmdsection">
                        <legend>
                            <div className="sidebarpanel-column-title">命令行</div>
                        </legend>
                        <div className="form-group">
                            <textarea className={cmdCls} placeholder="命令行不能为空" ref={ref=>this.cmd=ref} value={aCurOpe[0].cmd} rows="10" onChange={fnSettings.cmdChange} disabled={disabled}/>
                        </div>
                    </fieldset>
                    <fieldset className="paramsection">
                        <legend>
                            <div className="sidebarpanel-column-title">参数</div>
                        </legend>
                        <div className="form-group">
                            <textarea className="form-control txtareaparam" ref={ref=>this.param=ref} value={aCurOpe[0].param} rows="10" onChange={fnSettings.paramChange} disabled={disabled}/>
                        </div>
                    </fieldset>
                </div>;
        }

        return (
            <div className="settingpanelContent">
                {str}
            </div>
        );
    }
});

export default SettingPanelView;