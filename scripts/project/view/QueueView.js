/**
 * Created by anchao on 2016/6/2.
 */

let QueueView = React.createClass({
    getInitialState:function () {
        return {
            success:true,
            running:true,
            pending:true,
            failed:true
        }
    },
    setStatusActive:function (e) {
        let $target = $(e.currentTarget);
        let status = $target.val();
        let isChecked = $target.is(':checked');

        switch (status){
            case 'all':
                this.setState({
                    success:isChecked,
                    running:isChecked,
                    pending:isChecked,
                    failed:isChecked
                },function () {
                    window.localStorage.setItem('glQuStatus',JSON.stringify(this.state));
                });
                break;
            case 'success':
                this.setState({
                    success:isChecked
                },function () {
                    window.localStorage.setItem('glQuStatus',JSON.stringify(this.state));
                });
                break;
            case 'running':
                this.setState({
                    running:isChecked
                },function () {
                    window.localStorage.setItem('glQuStatus',JSON.stringify(this.state));
                });
                break;
            case 'pending':
                this.setState({
                    pending:isChecked
                },function () {
                    window.localStorage.setItem('glQuStatus',JSON.stringify(this.state));
                });
                break;
            case 'failed':
                this.setState({
                    failed:isChecked
                },function () {
                    window.localStorage.setItem('glQuStatus',JSON.stringify(this.state));
                });
                break;
        }
    },
    componentDidMount:function () {
        let glQuStatus = window.localStorage.getItem('glQuStatus');
        if(glQuStatus){
            glQuStatus = JSON.parse(glQuStatus);
            this.setState(glQuStatus);
        }
    },
    defaultFn:function (e) {
        e.preventDefault();
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
    setOneQueueActive:function (e) {
        let $target = $(e.currentTarget);
        let verId = $target.data('verid');
        if(!$(e.target).is('.adjust')){
            //修改当前选中版本
            $('.operators').data('operatorSub').onNext({type:"updateCurVersion",verId:verId});
        }
    },
    queueContextMenu:function (e) {
        let $target = $(e.currentTarget);
        let verId = $target.data('verid');

        //显示右键菜单
        $('.contextmenu').data('contextMenuSub').onNext({
            type:'showContextMenu',
            data:{
                display:true,
                left:e.pageX,
                top:e.pageY,
                aMenu:[{text:"删除",callback:function () {
                    this.deleteQueue(verId);
                }.bind(this)}]
            }
        });
        e.preventDefault();
    },
    deleteQueue:function (verId) {
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
                        $('.glqueue-panel').data('queueSub').onNext({
                            type:"deleteQueue",
                            verId:verId
                        });
                    }
                }]
        }).showModal();

        this.hideContextMenu();
    },
    adjustOrder:function (e) {
        if(e.button == 0){
            let $target = $(e.currentTarget);
            let $parent = $target.parent();
            let $posli = $parent.find('.posli');
            //碰撞li
            let aHits = [];
            //[from,to]位置索引
            let aFromTo = [];
            const liHeight = 32;

            //布局转换
            $parent.find('.datali').not('.hidden').each(function (index,ele) {
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
                    aFromTo.push($target.index() - 1);
                    aFromTo.push(toIndex);
                }
                ev.preventDefault();
            }).on('mouseup.dragqueueli',function () {
                $(this).off('.dragqueueli');
                //位置li
                $posli.addClass('hide');
                //恢复原有布局
                $parent.find('.datali,.posli').removeAttr('style');

                let verId = $target.data('verid');
                if(aFromTo.length>0&&aFromTo[0]!=aFromTo[1]){
                    $('.glqueue-panel').data('queueSub').onNext({
                        type:"adjust",
                        data:{
                            verId:verId,
                            from:aFromTo[0],
                            to:aFromTo[1]
                        }
                    });
                }
            });
        }
        
        e.preventDefault();
    },
    render:function () {
        let glQueueContentCls = this.props.active == 'glQueue' ? 'sidebarpanel glqueue-panel' : 'sidebarpanel glqueue-panel hide';
        let aQueue = this.props.queue;
        let aTask =[
            <li key="queuetitle" className="glqueue-title">
                <div className="row" onContextMenu={this.defaultFn}>
                    <div className="col-sm-4">DAG名称</div>
                    <div className="col-sm-4">版本号</div>
                    <div className="col-sm-4"><div className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            状态
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li><input type="checkbox" value="all" checked={this.state.success&&this.state.running&&this.state.pending&&this.state.failed} onChange={this.setStatusActive} /> 全部</li>
                            <li><input type="checkbox" value="success" checked={this.state.success} onChange={this.setStatusActive} /> success</li>
                            <li><input type="checkbox" value="running" checked={this.state.running} onChange={this.setStatusActive} /> running</li>
                            <li><input type="checkbox" value="pending" checked={this.state.pending} onChange={this.setStatusActive} /> pending</li>
                            <li><input type="checkbox" value="failed" checked={this.state.failed} onChange={this.setStatusActive} /> failed</li>
                        </ul>
                    </div></div>
                </div>
            </li>
        ];
        if(aQueue.length>0){
            aQueue.forEach(function (obj,index) {
                let liCls = 'datali';
                //这里隐藏元素用hidden避免与moveLi元素的隐藏用同一样式，后面移动时会过滤
                liCls = this.state[obj.status] ? 'datali' : liCls+' hidden';
                if(this.props.currentVersion){
                    liCls = this.props.currentVersion.id == obj.id ? liCls+' active' : liCls;
                }
                aTask.push(<li className={liCls} data-verid={obj.id} key={obj.id+'_'+index} onClick={this.setOneQueueActive} onContextMenu={this.queueContextMenu} onMouseDown={this.adjustOrder}>
                    <div className="row">
                        <div className="col-sm-4">{obj.name}</div>
                        <div className="col-sm-4">{obj.version}</div>
                        <div className="col-sm-4">{obj.status}</div>
                    </div>
                </li>);
            }.bind(this));

            aTask.push(<li key="moveLi" className="posli datali hide"></li>);
        }else {
            aTask.length = 0;
        }

        return (
            <div className={glQueueContentCls} onClick={this.hideContextMenu}>
                <div className="glqueuecontent">
                    <ul className="list-unstyled" style={{position:'relative'}}>
                        {aTask}
                    </ul>
                </div>
            </div>
        );
    }
});

export default QueueView;