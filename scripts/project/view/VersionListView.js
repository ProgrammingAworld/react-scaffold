/**
 * Created by anchao on 2016/6/2.
 */

import CreateVersionView from './CreateVersionView';
import VersionsController from '../controller/VersionsController';

let VersionListView = React.createClass({
    getInitialState:function () {
        return {
            dagName:"",
            dagIndex:-1,
            versionId:"",
            versionName:""
        };
    },
    forbidSpace:function (e) {
        if(e.which == 32){
            e.preventDefault();
        }
    },
    hideContextMenu:function () {
        //隐藏右键菜单
        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                display:false
            }
        });
    },
    expandOrCollNext: function (e) {
        if(!$(e.target).is('input')){
            $(e.currentTarget)
                .find('.caret').toggleClass('carettoleft')
                .end().next().toggleClass('hide');
        }
    },
    dagContextMenu:function (e,isLimit) {
        let $target = $(e.currentTarget);
        let name = $target.data('name');
        let index = $target.data('index');

        if(isLimit){
            //显示右键菜单
            $('.contextmenu').data('contextMenuSub').onNext({
                type:'showContextMenu',
                data:{
                    display:true,
                    left:e.pageX,
                    top:e.pageY,
                    aMenu:[{text:"新建版本",callback:function () {
                        this.createNewVersionBaseDagName(name);
                    }.bind(this)}]
                }
            });
        }else {
            //显示右键菜单
            $('.contextmenu').data('contextMenuSub').onNext({
                type:'showContextMenu',
                data:{
                    display:true,
                    left:e.pageX,
                    top:e.pageY,
                    aMenu:[{text:"新建版本",callback:function () {
                        this.createNewVersionBaseDagName(name);
                    }.bind(this)},{text:"编辑",callback:function(){
                        this.editDag(name,index);
                    }.bind(this)},{text:"删除",callback:function () {
                        this.deleteDag(name);
                    }.bind(this)}]
                }
            });
        }
        e.preventDefault();
    },
    createNewVersionBaseDagName:function (name) {
        //增加一个版本
        dialog({
            title: '新建版本',
            width: 520,
            button: [
                {
                    value: '取消'
                }, {
                    value: '确定',
                    callback: function () {
                        let sVersion = $('#app-version').val();

                        VersionsController.create({name:name,version:sVersion},function () {
                            this.close().remove();
                            //更新界面版本列表
                            $('.version-panel').data('versionSub').onNext({type:"updateVersions"});
                        }.bind(this));

                        return false;
                    }
                }],
            onshow: function () {
                ReactDOM.render(<CreateVersionView name={name} disabled={true} />, $('.ui-dialog-content').get(0));
            }
        }).showModal();
        this.hideContextMenu();
    },
    editDag:function (name,index) {
        //dagname编辑
        this.setState({
            dagName:name,
            dagIndex:index
        });

        _.delay(function () {
            $('.versionpanelcontent input:visible').focus();
        },100);

        this.hideContextMenu();
    },
    dagNameChange:function (e) {
        let newName = e.currentTarget.value;
        this.setState({
            dagName:newName
        });
    },
    dagNameDisableEdit:function (e) {
        let $target = $(e.currentTarget);
        let newName = $target.val();
        if($.trim(newName).length==0){
            dialog.alert('名称不能为空！');
            $target.focus();
        }else {
            let oldName = $target.closest('.dagname').data('name');
            this.setState({
                dagName:"",
                dagIndex:-1
            });
            $('.version-panel').data('versionSub').onNext({
                type:"modifyDagName",
                data:{name:oldName,newName:newName}
            });
        }
    },
    deleteDag:function (name) {
        dialog({
            title: '删除',
            content:`<div class="text-center">确定要删除吗？</div>`,
            width: 220,
            button: [
                {
                    value: '取消'
                }, {
                    value: '确定',
                    callback: function () {
                        $('.version-panel').data('versionSub').onNext({
                            type:"deleteDag",
                            name:name
                        });
                    }
                }]
        }).showModal();

        this.hideContextMenu();
    },
    versionContextMenu:function (e) {
        let $target = $(e.currentTarget);
        let id = $target.data('id');
        let version = $target.data('version');
        let bFind = this.props.queue.find(oVer=>oVer.id==id);

        //已在全局队列中的不允许编辑和删除
        if(!bFind){
            //显示右键菜单
            $('.contextmenu').data('contextMenuSub').onNext({
                type:'showContextMenu',
                data:{
                    display:true,
                    left:e.pageX,
                    top:e.pageY,
                    aMenu:[{text:"编辑",callback:function () {
                        this.editVersion(id,version);
                    }.bind(this)},{text:"删除",callback:function () {
                        this.deleteVersion(id);
                    }.bind(this)}]
                }
            });
        }else {
            dialog.alert('当前版本在全局队列中！','warning');
        }
        e.preventDefault();
    },
    versionNameChange:function (e) {
        this.setState({
            versionName:e.currentTarget.value
        });
    },
    versionNameDisableEdit:function (e) {
        let $target = $(e.currentTarget);
        let version = $target.val();
        if($.trim(version).length==0){
            dialog.alert('名称不能为空！');
            $target.focus();
        }else {
            $('.version-panel').data('versionSub').onNext({
                type:"modifyVersion",
                data:{id:this.state.versionId,version:version}
            });

            this.setState({
                versionId:"",
                versionName:""
            });
        }
    },
    editVersion:function (id,version) {
        this.setState({
            versionId:id,
            versionName:version
        });

        _.delay(function () {
            $('.versionpanelcontent input:visible').focus();
        },100);

        this.hideContextMenu();
    },
    deleteVersion:function (id) {
        dialog({
            title: '删除',
            content:`<div class="text-center">确定要删除吗？</div>`,
            width: 220,
            button: [
                {
                    value: '取消'
                }, {
                    value: '确定',
                    callback: function () {
                        $('.version-panel').data('versionSub').onNext({
                            type:"deleteVersion",
                            id:id
                        });
                    }
                }]
        }).showModal();

        this.hideContextMenu();
    },
    switchCurrentVersion: function (e) {
        let verId = $(e.currentTarget).data('id');

        //除编辑框点击之外其它都可以请求
        if(!$(e.target).is('input')){
            //修改当前选中版本
            $('.operators').data('operatorSub').onNext({type:"updateCurVersion",verId:verId});
        }
    },
    render:function () {
        //本面板是否显示
        let versionContentCls = this.props.display == 'version' ? 'sidebarpanel version-panel' : 'sidebarpanel version-panel hide';
        //按名称分组
        let obj = _.groupBy(this.props.versions,function (obj) {
            return obj.name;
        });
        //key排序
        let keys = Object.keys(obj).sort();
        //列表
        let aList = [];
        for(var index = 0, l=keys.length;index<l;index++){
            let key = keys[index];
            //dagname是否可编辑
            let dagnameTextCls = this.state.dagIndex == index ? 'hide' : '';
            let dagnameEditCls = this.state.dagIndex == index ? '' : 'hide';
            let dagContextMenu = function (e) {
                let dagName = $(e.currentTarget).data('name');
                let oVers = {};
                for(var oVer of obj[dagName]){
                    oVers[oVer.id] = oVer;
                }
                //全局队列中的元素是否在当前Dag中能够找到
                let bFind = this.props.queue.find(oVer=>{return oVers[oVer.id] !== undefined;});

                if(!bFind){
                    this.dagContextMenu(e);
                }else {
                    this.dagContextMenu(e,true);
                }

                e.preventDefault();
            }.bind(this);

            aList.push(<li key={key}>
                <div className="dagname" data-name={key} data-index={index} onClick={this.expandOrCollNext} onContextMenu={dagContextMenu}><span
                    className="caret"></span><span className={dagnameTextCls}>{key}</span><span className={dagnameEditCls}><input type="text" value={this.state.dagName} onKeyDown={this.forbidSpace} onChange={this.dagNameChange} onBlur={this.dagNameDisableEdit}/></span>
                </div>
                <ul className="list-unstyled verlist">
                    {
                        _.sortBy(obj[key],'createTime').map(function (item,index) {
                            if(this.props.currentVersion&&this.props.currentVersion.id == item.id){
                                return <li key={item.id+item.version} data-id={item.id} data-version={item.version} data-index={index} className="clearfix active" onClick={this.switchCurrentVersion} onContextMenu={this.versionContextMenu}><div className="pull-left"><span className={item.id==this.state.versionId?"hide":""}>{item.version}</span><span className={item.id==this.state.versionId?"":"hide"}><input type="text" value={this.state.versionName} onKeyDown={this.forbidSpace} onChange={this.versionNameChange} onBlur={this.versionNameDisableEdit}/></span></div><div className="pull-right">{item.status}</div></li>;
                            }else {
                                return <li className="clearfix" key={item.id+item.version} data-id={item.id} data-version={item.version} data-index={index} onClick={this.switchCurrentVersion} onContextMenu={this.versionContextMenu}><div className="pull-left"><span className={item.id==this.state.versionId?"hide":""}>{item.version}</span><span className={item.id==this.state.versionId?"":"hide"}><input type="text" value={this.state.versionName} onKeyDown={this.forbidSpace} onChange={this.versionNameChange} onBlur={this.versionNameDisableEdit}/></span></div><div className="pull-right">{item.status}</div></li>;
                            }
                        }.bind(this))
                    }
                </ul>
            </li>);
        }

        return (
            <div className={versionContentCls}>
                <div className="versionpanelcontent" onClick={this.hideContextMenu}>
                    <ul className="list-unstyled">
                        {
                            aList
                        }
                    </ul>
                </div>

            </div>
        );
    }
});

export default VersionListView;