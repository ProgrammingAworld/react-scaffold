/**
 * Created by anchao on 2016/5/26.
 */

import CreateVersionView from './CreateVersionView';
import LoginAction from '../../login/action/LoginAction';
import VersionsController from '../controller/VersionsController';
import QueueController from '../controller/QueueController';

let ToolbarView = React.createClass({
    getInitialState:function () {
        return {
          status:false
        };
    },
    componentDidMount:function () {
        //初始化tooltip
        $('[data-toggle="tooltip"]').tooltip();
        this.getStatus();
    },
    getStatus:function () {
        QueueController.getStatus(function (status) {
            this.setState({
                status:status
            });
            // _.delay(this.getStatus,2000);
        }.bind(this));
    },
    createProject:function () {
        //增加一个版本
        dialog({
            title: '新建DAG',
            width: 520,
            button: [
                {
                    value: '取消'
                }, {
                    value: '确定',
                    callback: function () {
                        let sName = $('#app-name').val();
                        let sVersion = $('#app-version').val();

                        if($.trim(sName).length==0){
                            dialog.alert('版本名称不能为空');
                            return;
                        }

                        if($.trim(sVersion).length==0){
                            dialog.alert('版本号不能为空');
                            return;
                        }

                        VersionsController.create({name:sName,version:sVersion},function () {
                            this.close().remove();
                            //更新界面版本列表
                            $('.version-panel').data('versionSub').onNext({type:"updateVersions"});
                        }.bind(this));

                        return false;
                    }
                }],
            onshow: function () {
                ReactDOM.render(<CreateVersionView name="" disabled={false}  />, $('.ui-dialog-content').get(0));
            }
        }).showModal();
    },
    runQueue:function () {
        $('.glqueue-panel').data('queueSub').onNext({type:"runGlobalQueue"});
        this.setState({
            status:true
        });
    },
    pauseQueue:function () {
        $('.glqueue-panel').data('queueSub').onNext({type:"pauseGlobalQueue"});
        this.setState({
            status:false
        });
    },
    saveAs:function () {
        let oCurVersion = this.props.currentVersion;

        if(oCurVersion){
            let verId = oCurVersion.id;
            dialog({
                title: '另存为',
                width: 520,
                button: [
                    {
                        value: '取消'
                    }, {
                        value: '确定',
                        callback: function () {
                            let sName = $('#app-name').val();
                            let sVersion = $('#app-version').val();

                            if($.trim(sName).length==0){
                                dialog.alert('版本名称不能为空');
                                return;
                            }

                            if($.trim(sVersion).length==0){
                                dialog.alert('版本号不能为空');
                                return;
                            }

                            VersionsController.saveAs({id:verId,newName:sName,newVersion:sVersion},function () {
                                this.close().remove();
                                //更新界面版本列表
                                $('.version-panel').data('versionSub').onNext({type:"updateVersions"});
                            }.bind(this));

                            return false;
                        }
                    }],
                onshow: function () {
                    ReactDOM.render(<CreateVersionView name={oCurVersion.name}  />, $('.ui-dialog-content').get(0));
                }
            }).showModal();
        }else {
            dialog.alert("请选择一个版本");
        }
    },
    save:function () {
        let oCurVersion = this.props.currentVersion;
        if(oCurVersion){
            $('.operators').data('operatorSub').onNext({
                type: 'saveMetaToDB'
            });
        }else {
            dialog.alert("请选择一个版本");
        }
    },
    logout:function () {
        LoginAction.logout().done(function (oRes) {
            if(oRes.success){
                location.href = 'login.html';
            }
        });
    },
    render:function () {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let runCls = this.state.status ? 'icon-move toolbar-run hide' : "icon-move toolbar-run";
        let pauseCls = this.state.status ? 'icon-pause toolbar-pause' : "icon-pause toolbar-pause hide";
        return (
            <div className="whale-app-toolbar">
                <div className="pull-left">
                    <span className="icon-increase toolbar-create" data-toggle="tooltip" data-placement="right" title="新建版本" onClick={this.createProject}></span>
                    <span className="icon-save toolbar-save" data-toggle="tooltip" data-placement="right" title="保存" onClick={this.save}></span>
                    <span className="icon-saveas toolbar-saveas" data-toggle="tooltip" data-placement="right" title="另存为" onClick={this.saveAs}></span>
                    <div className="spacing"></div>
                    <span className={runCls} data-toggle="tooltip" data-placement="right" title="运行全局队列" onClick={this.runQueue}></span>
                    <span className={pauseCls} data-toggle="tooltip" data-placement="right" title="暂停全局队列" onClick={this.pauseQueue}></span>
                </div>
                <div className="pull-right"><span>{userInfo.displayName}</span><span style={{fontSize:18,cursor:'pointer'}} className="icon-cancelbutton" onClick={this.logout}></span></div>
            </div>
        )
    }
});

export default ToolbarView;