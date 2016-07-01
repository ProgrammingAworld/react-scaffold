/**
 * Created by anchao on 2016/5/26.
 */
import Topologic from '../others/TopologicalSort';

let DetailContentDown = React.createClass({
    getInitialState:function () {
        return {
            disY:0
        }
    },
    componentDidMount:function () {
        //下面板的订阅者
        let bottomPanelSub = new Rx.Subject();
        bottomPanelSub.subscribe(function (oData) {
            switch (oData.type){
                case "modifyBottom":
                    //修改底面板尺寸
                    this.layoutModifyBottom(oData.data.value,oData.data.max,oData.data.evName);
                    break;
            }
        }.bind(this));

        //绑定在底部面板上,供centerPanel调用
        $('.operators').data('bottomPanelSub',bottomPanelSub);
    },
    layoutModifyBottom:function (value,max,evName) {
        //数据修改底部面板的高度
        let layout = this.props.layout;
        let min = layout.bottom.height.MIN;

        //取值在[min,max]之间
        value = value>max?max:value<min?min:value;

        //记忆原始宽度,待展开时用
        if(evName == 'mousedown'){
            layout.bottom.height.beforeMIN = value;
        }

        //鼠标抬起时检查
        if(evName == 'mouseup'){
            //左边栏宽度<=50时自动收缩
            value = value<=50?0:value;
        }

        if(evName == 'expand'){
            layout.bottom.height.current = layout.bottom.height.beforeMIN;
        }else if(evName == 'collapse'){
            //记忆当前宽度
            layout.bottom.height.beforeMIN = layout.bottom.height.current;
            layout.bottom.height.current = 0;
        }else if(evName == 'fullscreen') {
            if(layout.bottom.height.current == max){
                layout.bottom.height.current = layout.bottom.height.beforeMIN;
            }else {
                layout.bottom.height.current = value;
            }
        }else {
            layout.bottom.height.current = value;
        }

        this.props.updateLayout(layout);
    },
    bottomSectionHeightChange:function (e) {
        if(e.button == 0){
            //底部高度修改
            let $target = $(e.currentTarget);
            let max = $target.parent().parent().height();
            let disY = e.pageY - $target.position().top;

            this.setState({
                disY:disY
            });

            //记录拖动前的height
            let bottomHeight = $(e.currentTarget).parent().height();
            this.layoutModifyBottom(bottomHeight,max,'mousedown');

            $(document).on('mousemove.bottomchange',function (e) {
                let bottomH =bottomHeight - (e.pageY - this.state.disY);
                this.layoutModifyBottom(bottomH,max);
                e.preventDefault();
            }.bind(this))
                .on('mouseup.bottomchange',function (e) {
                    let bottomH =bottomHeight - (e.pageY - this.state.disY);
                    this.layoutModifyBottom(bottomH,max,'mouseup');

                    $(e.currentTarget).off('.bottomchange');
                }.bind(this));
        }

        e.preventDefault();
    },
    expandBottomPanel:function (e) {
        //展开底部面板
        let max = $(e.currentTarget).parent().parent().height();
        this.layoutModifyBottom(200,max,'expand');
    },
    collapseRightPanel:function (e) {
        //关闭底部面板
        let max = $(e.currentTarget).closest('.whale-app-content-down').parent().height();
        this.layoutModifyBottom(200,max,'collapse');
    },
    addToGlobalQueue:function () {
        $('.glqueue-panel').data('queueSub').onNext({type:"addGlobalQueue"});
    },
    clearTaskQueue:function () {
        //open/running/success/failed/succeedRerun/failedRerun
        //清空meta里queue
        $('.version-panel').data('versionSub').onNext({
            type:"modifyQueue",
            data:{
                verId:this.props.currentVersion.id,
                queue:[]
            }
        });

        //重置所有算子的状态为new
        this.props.currentVersion.meta.vars.forEach(function (ope) {
            $('.operators').data('operatorSub').onNext({
                type:"operatorPropschange",
                data:{
                    opeId:ope.id,
                    props:{
                        status:'open',
                        beginRunTime:'',
                        endRunTime:''
                    }
                }
            });
        });
    },
    adjustNodeInQueue:function(currentVersion, opId, from, to) {
        //返回调整后的队列，不能调整则返回原队列并给出提示信息
        let oldQueue = currentVersion.meta.queue.join('|');
        let newQueue = Topologic.adjustNodeInQueue(currentVersion, opId, from, to).join('|');
        let oRes = null;
        if(oldQueue!=newQueue){
            oRes = {
                success: true,
                queue: Topologic.adjustNodeInQueue(currentVersion, opId, from, to)
            };
        }else {
            oRes = {
                success: false,
                error: "此节点不能移动！"
            }
        }

        return oRes;
    },
    adjustOrder:function (e) {
        if(e.button == 0){
            let $target = $(e.currentTarget);
            let opeId = $target.data('opeid');
            let $parent = $target.parent();
            let $posli = $parent.find('.posli');

            //选中相应算子
            $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[opeId]}});

            //碰撞li
            let aHits = [];
            //[from,to]位置索引
            let aFromTo = [];
            const liHeight = 32;

            //布局转换
            $parent.find('.datali').each(function (index,ele) {
                $(this).css({
                    position:'absolute',
                    left:0,
                    top:liHeight*(index+1)
                });
            });

            //定位li到选中的li处
            let oCurPos = $target.position();
            let disY = e.pageY - oCurPos.top;

            $posli.removeClass('hide').css({
                top:oCurPos.top
            });

            //置顶
            $target.css({
                zIndex:900
            });

            $(document).on('mousemove.dragqueueli',function (ev) {
                let movedTop = ev.pageY - disY;
                //移动选中元素
                $target.css({
                    top:movedTop
                });

                //获得碰撞的元素
                $parent.find('.datali').not($target).each(function (i) {
                    let $obj = $(this);
                    let oObjPos = $obj.position();
                    let hitTop = oObjPos.top;

                    if(movedTop>hitTop+liHeight||movedTop+liHeight<hitTop){
                        //没有碰撞
                    }else {
                        aHits.push($obj);
                    }
                });

                let findCount = aHits.length;
                let $hitTarget = null;

                if(findCount>0){
                    if(findCount == 1){
                        $hitTarget = aHits[0];
                    }else {
                        //检查距离最小的那个元素
                        let distance = 9999;
                        aHits.forEach(function (item,j) {
                            let absDis = Math.abs(item.position().top - movedTop);

                            if(absDis<distance){
                                distance = absDis;
                                $hitTarget = item;
                            }
                        });
                    }
                }else {
                    //为了拖到最顶部或最底部时也能变换位置，这里不应该执行以下操作，而是永远记忆上一次碰撞后的元素
                    // aFromTo.length = 0;
                    // console.log('没有找到');
                }

                if($hitTarget!=null){
                    let hitTop = $hitTarget.position().top;
                    let posTop = $posli.position().top;
                    //交换位置
                    $posli.css('top',hitTop);
                    $hitTarget.css('top', posTop);

                    //记忆to的位置
                    aFromTo.length = 0;
                    let toIndex = $hitTarget.position().top/liHeight - 1;
                    aFromTo.push($target.index()-1);
                    aFromTo.push(toIndex);
                }
                ev.preventDefault();
            }).on('mouseup.dragqueueli',function () {
                $(document).off('.dragqueueli');
                //位置li
                $posli.addClass('hide');
                //恢复原有布局
                $parent.find('.datali,.posli').removeAttr('style');

                let verId = $target.data('verid');

                if(aFromTo.length>0&&aFromTo[0]!=aFromTo[1]){
                    let oQueue = this.adjustNodeInQueue(this.props.currentVersion,opeId,aFromTo[0],aFromTo[1]);
                    if(oQueue.success){
                        $('.version-panel').data('versionSub').onNext({
                            type:"modifyQueue",
                            data:{verId:this.props.currentVersion.id,queue:oQueue.queue}
                        });
                    }else {
                        dialog.alert(oQueue.error,'warning');
                    }
                }
            }.bind(this));
        }

        e.preventDefault();
        e.stopPropagation();
    },
    rowContextMenu:function (e) {
        let $target = $(e.currentTarget);
        let opeId = $target.data('opeid');
        let status = $target.attr('data-status');
        let aMenu = [];

        if(status == "success" || status == "failed"){
            aMenu = [{text:"重运行",callback:this.rerun.bind(this,opeId,status)}];
        }

        if(status == "succeedRerun" || status == "failedRerun"){
            aMenu = [{text:"取消重运行",callback:this.cancelRerun.bind(this,opeId,status)}];
        }

        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                left:e.pageX,
                top:e.pageY,
                display:true,
                aMenu:aMenu
            }
        });
        e.preventDefault();
    },
    hideContexMenu:function () {
        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                display:false
            }
        });
    },
    rerun:function (opeId,status) {
        status = status == "success" ? "succeedRerun" : "failedRerun";
        $('.operators').data('operatorSub').onNext({
            type:"operatorPropschange",
            data:{
                opeId:opeId,
                props:{
                    status:status
                }
            }
        });

        this.hideContexMenu();
    },
    cancelRerun:function (opeId,status) {
        status = status == "succeedRerun" ? "success" : "failed";
        $('.operators').data('operatorSub').onNext({
            type:"operatorPropschange",
            data:{
                opeId:opeId,
                props:{
                    status:status
                }
            }
        });

        this.hideContexMenu();
    },
    cancelActiveOpe:function (e) {
        if($(e.target).is('.hasContent')){
            //隐藏右键菜单
            this.hideContexMenu();
            //算子取消选中
            $('.operators').data('operatorSub').onNext({type:"unselectedope"});
        }
    },
    render:function () {
        let bottom = this.props.layout.bottom;
        let curVersion = this.props.currentVersion;
        let aCurrentOpe = this.props.currentOpe;
        let currentOpe = aCurrentOpe[0];
        let queue = this.props.queue;
        let taskCount = 0;
        let aTr = [];
        let oStatus = {};
        let fnDefault = function (e) {
            e.preventDefault();
        };
        let fnRow = {
            fnRowContext:fnDefault,
            fnAdjustOrder:function (e) {
                //选中相应算子
                $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[$(e.currentTarget).data('opeid')]}});
                e.preventDefault();
            }
        };
        //每行样式，是否选中
        let rowCls = "row datali"
        //添加到全局队列按钮是否可见
        let addToQueCls = "icon-new";
        let clearTaskQueCls = "icon-delete1";

        if(curVersion&&!$.isEmptyObject(curVersion.meta)&&curVersion.meta.queue.length > 0){
            taskCount = curVersion.meta.queue.length;
            let vars = curVersion.meta.vars;
            //任务队列是否在全局队列中
            let inGlQueue = !!queue.find(oVer=>{return oVer.id == curVersion.id});
            addToQueCls = !inGlQueue?"icon-new":"icon-new hide";
            clearTaskQueCls = !inGlQueue?"icon-delete1":"icon-delete1 hide";

            curVersion.meta.queue.forEach(function (opeId,index) {
                let curOpe = vars.filter(function (ope) {
                    return ope.id == opeId;
                })[0];

                if(!oStatus[curOpe.status]){
                    oStatus[curOpe.status] = 1;
                }else {
                    oStatus[curOpe.status] = oStatus[curOpe.status] + 1;
                }

                //只有成功或失败状态的行才能出现重运行的右键菜单
                if(!inGlQueue&&(curOpe.status == "success" || curOpe.status == "failed" || curOpe.status == "succeedRerun" || curOpe.status == "failedRerun")){
                    fnRow.fnRowContext = this.rowContextMenu;
                }else {
                    fnRow.fnRowContext = fnDefault;
                }

                if(!inGlQueue){
                    fnRow.fnAdjustOrder = this.adjustOrder;
                }

                if(currentOpe&&curOpe.id == currentOpe.id){
                    rowCls = "line clearfix datali active";
                }else {
                    rowCls = "line clearfix datali";
                }

                aTr.push(
                    <div className={rowCls} key={curOpe.id} data-opeid={curOpe.id} data-status={curOpe.status} onContextMenu={fnRow.fnRowContext} onMouseDown={fnRow.fnAdjustOrder}>
                        <div className="pull-left">{index+1}</div>
                        <div className="pull-left">{curOpe.id}</div>
                        <div className="pull-left">{curOpe.name}</div>
                        <div className="pull-left">{curOpe.cmd}</div>
                        {curOpe.param.length>0?<div className="pull-left">{curOpe.param}</div>:<div className="pull-left" dangerouslySetInnerHTML={{__html: "&nbsp;"}} />}
                        <div className="pull-left">{curOpe.status}</div>
                        {curOpe.beginRunTime?<div className="pull-left fixedWidth">{Tools.formatSdate(curOpe.beginRunTime)}</div>:<div className="pull-left fixedWidth" dangerouslySetInnerHTML={{__html: "&nbsp;"}} />}
                        {curOpe.endRunTime?<div className="pull-left fixedWidth">{Tools.formatSdate(curOpe.endRunTime)}</div>:<div className="pull-left fixedWidth" dangerouslySetInnerHTML={{__html: "&nbsp;"}} />}
                    </div>
                );
            }.bind(this));
            aTr.push(<div key="moverow" className="row posli datali hide"><div className="col-sm-12">&nbsp;</div></div>);
        }else {
            aTr.push(<div className="row" key="empty"><div className="col-sm-12">没有相关数据！</div></div>);
        }

        let taskpaneltitleCls = taskCount>0?"taskpaneltitle":"taskpaneltitle hide";
        let taskpanelContentCls = taskCount>0?"taskpanelContent":"taskpanelContent hide";

        let aStatus = Object.keys(oStatus);
        let aStrStatus = [];
        aStatus.forEach(function (status) {
            aStrStatus.push(`${status}:${oStatus[status]}个`);
        });
        let taskName = taskCount>0?`DAG名称：${curVersion.name}，版本号：${curVersion.version}，${aStrStatus.join("，")}`:"";

        return (
            <div className="whale-app-content-down" style={{height:bottom.height.current}} onClick={this.hideContexMenu}>
                <div className="bottombar-title">
                    <div className="pull-right"><a href="javascript:;" className="whale-app-panel-button-special" onClick={this.collapseRightPanel}><span className="glyphicon icon-delete"></span></a></div>
                    <div className="bottompanel-title">任务队列</div>
                </div>
                <div className="whale-app-panelContent">
                    <div className={taskpaneltitleCls}><span className={addToQueCls} data-toggle="tooltip" data-placement="right" title="添加到全局队列"  onClick={this.addToGlobalQueue}></span><span className={clearTaskQueCls} data-toggle="tooltip" data-placement="right" title="清空任务队列"  onClick={this.clearTaskQueue}></span><span className="taskname">{taskName}，共{taskCount}个任务</span></div>
                    <div className={taskpanelContentCls}>
                        <div className="hasContent" onClick={this.cancelActiveOpe}>
                            <div className="line clearfix">
                                <div className="pull-left">#</div>
                                <div className="pull-left">id</div>
                                <div className="pull-left">算子名称</div>
                                <div className="pull-left">命令行</div>
                                <div className="pull-left">参数</div>
                                <div className="pull-left">运行状态</div>
                                <div className="pull-left fixedWidth">开始时间</div>
                                <div className="pull-left fixedWidth">结束时间</div>
                            </div>
                            {aTr}
                        </div>
                    </div>
                </div>
                <div className="drag-vertical-line-extend" onMouseDown={this.bottomSectionHeightChange}></div>
                <div className={bottom.height.current == 0 ? 'drag-vertical-line-change' : 'drag-vertical-line-change hide'} onClick={this.expandBottomPanel}><span className="caret pullToDown"></span></div>
            </div>
        )
    }
});

export default DetailContentDown;