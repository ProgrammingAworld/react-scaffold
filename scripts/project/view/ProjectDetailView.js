/**
 * Created by anchao on 2016/5/26.
 */

import ToolbarView from './ToolbarView';
import DetailContentUp from './DetailContentUpView';
import DetailContentDown from './DetailContentDownView';
import VersionsController from '../controller/VersionsController';
import QueueController from '../controller/QueueController';

let ProjectDetailView = React.createClass({
    getInitialState: function () {
        /**
         * queue:全局队列
         * versions: 所有版本数据
         * currentVersion:当前选中的版本
         * currentOpe:当前选中的算子，供单个算子编辑名称和右侧面板编辑参数等变量时使用
         * contextMenuPos:右键菜单位置
         * contextMenuShow:右键菜单是否显示
         * contextMenu:右键菜单列表
         * layout:界面左右下的拖拽数据
         */
        return {
            queue:[],
            versions:[],
            currentVersion:null,
            currentOpe: [],
            contextMenuPos: {left:0,top:0},
            contextMenuShow: false,
            contextMenu:[],
            layout: {
                left: {
                    "width": {
                        MAX: 500,
                        MIN: 0,
                        beforeMIN: 500,
                        current: 360
                    }
                },
                "right": {
                    "width": {
                        MAX: 620,
                        MIN: 0,
                        beforeMIN: 620,
                        current: 360
                    }
                },
                "bottom": {
                    "height": {
                        MIN: 0,
                        NORMAL: 200,
                        beforeMIN: 200,
                        current: 200
                    }
                }
            }
        }
    },
    componentDidMount: function () {
        //版本的订阅者
        let versionSub = new Rx.Subject();
        versionSub.subscribe(function (oData) {
            switch (oData.type) {
                case "modifyDagName":
                    //修改版本的name
                    this.modifyDagName(oData.data.name,oData.data.newName);
                    break;
                case "modifyVersion":
                    //修改版本的vesion
                    this.modifyVersion(oData.data.id,oData.data.version);
                    break;
                case "modifyQueue":
                    //修改版本的queue
                    this.modifyQueue(oData.data.verId,oData.data.queue);
                    break;
                case "deleteVersion":
                    //修改版本的vesion
                    this.deleteVersion(oData.id);
                    break;
                case "deleteDag":
                    //删除name下的所有版本
                    this.deleteDag(oData.name);
                    break;
                case "updateVersions":
                    //创建一个版本后更新版本列表
                    this.updateVersions();
                    break;
            }
        }.bind(this));
        //绑定在vesion对象到具体面板节点
        $('.version-panel').data('versionSub', versionSub);

        //算子的订阅者
        let operatorSub = new Rx.Subject();
        operatorSub.subscribe(function (oData) {
            switch (oData.type) {
                case "updateCurVersion":
                    //切换版本时必须由VersionList中传递过来
                    let verId = oData.verId;
                    //需要从数据库得到详细实体信息
                    VersionsController.getById({id:verId},function (isSuccess) {
                        //修改所有实体对象
                        this.updateVersions();
                        let curVer = VersionsController.getData().filter(function (item) {
                            return item.id == verId;
                        })[0];
                        this.updateCurVersion(curVer);
                        //修改当前选中算子为空
                        this.updateCurOpe([]);
                    }.bind(this));
                    break;
                case "createoperator":
                    //创建算子
                    this.createOperator(this.state.contextMenuPos.left, this.state.contextMenuPos.top);
                    break;
                case "deleteoperator":
                    //删除一个算子
                    this.deleteOperator(oData.opeId);
                    break;
                case "operatorPropschange":
                    //算子属性改变
                    this.operatorPropsChange(oData.data.opeId, oData.data.props);
                    break;
                case "selectedope":
                    //算子选中
                    this.operatorSelected(oData.data.opeId);
                    break;
                case "unselectedope":
                    //算子取消选中
                    this.operatorCancelSelected();
                    break;
                case "saveMetaToDB":
                    let showTip = oData.showTip === undefined ? true : oData.showTip;
                    //保存当前meta信息到数据库
                    this.saveMeta(showTip);
                    break;
                case "addQueue":
                    //算子右键菜单功能，添加到队列时修改当前版本的状态
                    this.addQueue(oData.newQueue);
                    break;
            }
        }.bind(this));
        //绑定在算子父级元素上
        $('.operators').data('operatorSub', operatorSub);

        //队列的订阅者
        let queueSub =  new Rx.Subject();
        queueSub.subscribe(function (oData) {
            switch (oData.type){
                case "deleteQueue":
                    //从全局队列中删除一个
                    this.deleteGlobalQueue(oData.verId);
                    break;
                case "addGlobalQueue":
                    //任务队列+号功能
                    _.delay(function () {
                        this.addGlobalQueue();
                    }.bind(this),30);
                    //meta信息保存
                    this.saveMeta(false,'pending');
                    break;
                case "runGlobalQueue":
                    //全局队列运行功能
                    this.runGlobalQueue();
                    break;
                case "pauseGlobalQueue":
                    //全局队列暂停功能
                    this.pauseGlobalQueue();
                    break;
                case "adjust":
                    //调整全局队列顺序
                    this.queueAdjust(oData.data.verId,oData.data.from,oData.data.to);
                    break;
            }
        }.bind(this));
        //绑定到全局队列面板上
        $('.glqueue-panel').data('queueSub',queueSub);

        //右键菜单
        let contextMenuSub = new Rx.Subject();
        contextMenuSub.subscribe(function (oData) {
            switch (oData.type){
                case 'showContextMenu':
                    this.showContextMenu(oData.data.display,oData.data.left,oData.data.top,oData.data.aMenu);
                    break;
            }
        }.bind(this));
        //绑定在右键菜单元素上
        $('.contextmenu').data('contextMenuSub',contextMenuSub);       

        //获得版本列表所有数据
        VersionsController.getAll(function () {
            this.updateVersions();
        }.bind(this));

        //获得全局队列所有数据
        QueueController.getAll(function () {
            this.updateQueue();
        }.bind(this));
    },
    updateQueue:function () {
        this.setState({
           queue:QueueController.getData()
        });
    },
    modifyDagName:function (name,newName) {
        VersionsController.modifyName({name:name,newName:newName},function () {
           this.updateVersions();
        }.bind(this));
    },
    deleteDag:function (name) {
        VersionsController.deleteAll({name:name},function () {
            this.updateVersions();
            this.updateCurVersion(null);
            this.updateCurOpe([]);
        }.bind(this));
    },
    modifyVersion:function (id,newVersion) {
        VersionsController.modifyVersion({id:id,newVersion:newVersion},function () {
            this.updateVersions();
        }.bind(this));
    },
    modifyQueue:function (verId,queue) {
        //修改当前版本的queue
        let oNew = VersionsController.getData().filter(function (version) {
            return version.id == verId;
        }.bind(this))[0];

        oNew.meta.queue = queue;

        //如果queue为空，则修改version的状态
        if(queue.length == 0){
            oNew.status = "open";
        }

        //修改当前版本的meta里的queue
        this.updateCurVersion(oNew);
        this.saveMeta(false);
    },
    deleteVersion:function (id) {
        VersionsController.delete({id:id},function () {
            this.updateVersions();
            this.updateCurVersion(null);
            this.updateCurOpe([]);
        }.bind(this));
    },
    updateVersions(){
        this.setState({
            versions: VersionsController.getData()
        });
    },
    queueAdjust:function (verId,from,to) {
        QueueController.adjust({id:verId,from:from,to:to},function () {
           this.updateQueue();
        }.bind(this));
    },
    updateCurVersion(curVer){
        //修改当前版本对象
        this.setState({
            currentVersion:curVer
        });
    },
    deleteGlobalQueue:function (verId) {
        QueueController.deleteFromQueue({id: verId}, function () {
            this.updateQueue();

            VersionsController.getAll(function () {
                this.updateVersions();

                //当前是否有选中的版本
                if(this.state.currentVersion != null){
                    //更新当前version的状态为open
                    let oNew = VersionsController.getData().filter(function (version) {
                        return version.id == this.state.currentVersion.id;
                    }.bind(this))[0];
                    $.extend(oNew,this.state.currentVersion);
                    oNew.status = "open";
                    this.updateCurVersion(oNew);
                }
            }.bind(this));
        }.bind(this));
    },
    addGlobalQueue:function () {
        let curVerId = this.state.currentVersion.id;
        QueueController.add({id:curVerId},function () {
            //更新全局队列
            this.updateQueue();

            //更新当前version的状态为pending
            let oNew = VersionsController.getData().filter(function (version) {
                return version.id == curVerId;
            }.bind(this))[0];
            oNew.status = "pending";
            this.updateCurVersion(oNew);
        }.bind(this));
    },
    runGlobalQueue:function () {
        QueueController.run();
    },
    pauseGlobalQueue:function () {
        QueueController.pause();
    },
    updateContextMeun:function (display,left,top,aMenu) {
        this.setState({
            contextMenuPos: {left:left,top:top},
            contextMenuShow: display,
            contextMenu:aMenu
        });
    },
    updateCurOpe:function (curOpe) {
        //修改当前选中的算子
        this.setState({
            currentOpe:curOpe
        });
    },
    updateLayout(newLayout){
        this.setState({
            layout: newLayout
        });
    },
    createOperator(left, top){
        let opeParentPos = $('#painting').offset();
        left = left - opeParentPos.left;
        top = top - opeParentPos.top;

        let nMaxId = 0;
        //查找当前算子最大的id
        if(this.state.currentVersion.meta.vars.length>0){
            this.state.currentVersion.meta.vars.forEach(function (ope) {
                let id = parseInt(ope.id.replace('operator',''),10);
                if(id>nMaxId){
                    nMaxId = id;
                }
            });
        }

        let newOpe = {
            "id": "operator" + (nMaxId+1),
            "name": "新建算子" + (nMaxId+1),
            "ui": {"left": left, "top": top},
            "dependencies": [],
            "cmd": "",
            "param": "",
            "beginRunTime": "",
            "endRunTime": "",
            "status": "new"
        };

        //创建一个算子
        let aNew = VersionsController.getData().map(function (obj) {
            if(obj.id == this.state.currentVersion.id){
                obj.meta.vars.push(newOpe);
            }

            return obj;
        }.bind(this));
        VersionsController.setData(aNew);
        this.updateVersions();
        this.updateCurOpe([newOpe]);
    },
    deleteOperator:function (aOpeId) {
        //检查当前算子有没有依赖，先行找出所有的叶子节点并删除
        let aLeafNode = new Set();
        //找到所有依赖节点id
        let aDependencies = [];
        for(var ope of this.state.currentVersion.meta.vars){
            aDependencies = aDependencies.concat(ope.dependencies);
        }
        let aDepSet = new Set(aDependencies);
        aOpeId.forEach(function (opeId,index) {
            if(aDepSet.has(opeId)){
                //有依赖不能删除
            }else {
                aLeafNode.add(opeId);
                //标记可以删除
                aOpeId[index] = "removed";
            }
        });

        if(aLeafNode.size == 0){
            if(aOpeId.length != 0){
                //选中相应算子
                $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[aOpeId[0]]}});
                dialog.alert('其它算子依赖此算子不能删除！','warning');
            }
        }else {
            //aOpeId中删除所有的叶子节点id
            aOpeId = aOpeId.filter(function (opeId) {
                return opeId != "removed";
            });

            let aNew = VersionsController.getData().map(function (version, index) {
                if (version.id == this.state.currentVersion.id) {
                    //移除某一算子
                    let aNewVars = version.meta.vars.filter(function (oVar) {
                        return !aLeafNode.has(oVar.id);
                    });

                    version.meta.vars = aNewVars;
                }

                return version;
            }.bind(this));

            VersionsController.setData(aNew);
            this.updateVersions();
            this.updateCurOpe([]);

            //递归删除
            if(aOpeId.length>0){
                this.deleteOperator(aOpeId);
            }
        }
    },
    operatorPropsChange: function (opeId, opeProps) {
        let aCurOpe = this.state.currentOpe;
        let aNewActiveOpeId = new Set();
        for(let ope of aCurOpe){
            aNewActiveOpeId.add(ope.id);
        }
        //修改后的当前算子
        let aNewActiveOpe = [];
        let aNew = VersionsController.getData().map(function (version, index) {
            if (version.id == this.state.currentVersion.id) {
                version.meta.vars.forEach(function (ope) {
                    if(ope.id == opeId){
                        $.extend(ope,opeProps);
                    }
                    //修改后的算子
                    if(aNewActiveOpeId.has(ope.id)){
                        aNewActiveOpe.push(ope);
                    }
                }.bind(this))
            }

            return version;
        }.bind(this));

        VersionsController.setData(aNew);
        this.updateVersions();
        this.updateCurOpe(aNewActiveOpe);
    },
    operatorSelected:function (aOpeId) {
        let aNew = VersionsController.getData().map(function (version, index) {
            if (version.id == this.state.currentVersion.id) {
                let aOpe = [];
                let oVars = {};

                version.meta.vars.forEach(function (ope) {
                    oVars[ope.id] = ope;
                });

                aOpeId.forEach(function (opeId) {
                    aOpe.push(oVars[opeId]);
                });

                //修改当前选中的算子
                this.updateCurOpe(aOpe);
            }

            return version;
        }.bind(this));

        VersionsController.setData(aNew);
        this.updateVersions();
    },
    operatorCancelSelected:function () {
        //修改当前选中算子
        this.updateCurOpe([]);
    },
    saveMeta:function (isShowTip,status) {
        if(this.state.currentVersion){
            let verId = this.state.currentVersion.id;
            let meta = this.state.currentVersion.meta;
            let oSettings = status ? {id:verId,meta:meta,status:status}: {id:verId,meta:meta};
            VersionsController.modifyMeta(oSettings,function () {
                //是否调用提示信息
                if(isShowTip){
                    dialog.alert('保存成功!');
                }
            });
        }else {
            dialog.alert('请选择一个版本!');
        }
    },
    addQueue:function (newQueue) {
        //修改当前版本的status,算子添加到队列
        let oNew = VersionsController.getData().filter(function (version) {
            return version.id == this.state.currentVersion.id;
        }.bind(this))[0];

        oNew.meta.queue = newQueue;

        //修改当前版本的meta里的queue
        this.updateCurVersion(oNew);
        this.saveMeta(false);
    },
    showContextMenu: function (display,left,top,aMenu) {
        left = left === undefined ? 0 : left;
        top = top === undefined ? 0 : top;
        aMenu = aMenu === undefined? [] : aMenu;
        this.updateContextMeun(display,left,top,aMenu);
    },
    render(){
        let data = {
            layout:this.state.layout,
            updateLayout:this.updateLayout,
            queue:this.state.queue,
            versions:this.state.versions,
            currentVersion:this.state.currentVersion,
            currentOpe: this.state.currentOpe
        };
        return (
            <div id="project-projectdetail">
                <ToolbarView currentVersion={this.state.currentVersion} />
                <div className="whale-project-content">
                    <DetailContentUp {...data} />
                    <DetailContentDown {...data}/>
                </div>
                <div className="contextmenu"
                     style={{display:this.state.contextMenuShow?'block':'none',left:this.state.contextMenuPos.left,top:this.state.contextMenuPos.top}}
                     ref={contextmenu=>this.contextmenu = contextmenu}>
                    <ul className="dropdown-menu" role="menu">
                        {this.state.contextMenu.map(function (item,index) {
                            return <li role="presentation" key={item.text+index}><a role="menuitem" tabindex="-1" href="javascript:;"
                                                                                    onClick={item.callback}>{item.text}</a></li>;
                        })}
                    </ul>
                </div>
            </div>
        )
    }
});

export default ProjectDetailView;