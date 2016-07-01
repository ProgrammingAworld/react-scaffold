/**
 * Created by anchao on 2016/5/27.
 */

import Topologic from '../others/TopologicalSort';
import PureRenderMixin from 'react-addons-pure-render-mixin';

let OperatorView = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState: function () {
        return {
            nameEdit: false
        }
    },
    hideContextMenu:function () {
        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                display:false
            }
        });
    },
    dragOperator: function (e) {
        //取消编辑状态
        if($('.operatorname').is(':visible')){
            let ope = this.props.currentOpe[0];
            this.props.updateOpeEditStatus(ope.id,0,0,$('.operatorname>input').val(),false);
        }

        //拖动
        function dragOpes(aOpe) {
            let aPos = [];
            aOpe.forEach(function (ope) {
                aPos.push({disX:e.pageX - ope.ui.left,disY:e.pageY - ope.ui.top});
            });

            $(document).on('mousemove.dragOpes', function (ev) {
                for(let i = 0,l=aPos.length; i < l; i++){
                    let oOpe = aOpe[i];
                    let oPos = aPos[i];
                    let left = ev.pageX - oPos.disX;
                    let top = ev.pageY - oPos.disY;

                    left = left < 0 ? 0 : left;
                    top = top < 0 ? 0 : top;

                    //发送请求保存,为了实时画线
                    $('.operators').data('operatorSub').onNext({
                        type: 'operatorPropschange',
                        data: {opeId:oOpe.id, props:{ui:{left: left, top: top}}}
                    });
                }

                ev.preventDefault();
                ev.stopPropagation();
            }).on('mouseup.dragOpes', function (e) {
                $(document).off('.dragOpes');
                e.stopPropagation();
            });
        }

        let oVars = {};
        this.props.currentVersion.meta.vars.forEach(function (ope) {
            oVars[ope.id] = ope;
        });

        //左键
        if(e.button == 0){
            //选中元素是否为多个
            let aActiveOpeId = new Set();
            this.props.currentOpe.forEach(function (ope) {
                aActiveOpeId.add(ope.id);
            });

            //如果当前选中的算子在选中算子中,防止与算子点击切换选中冲突！！
            if(aActiveOpeId.has(this.props.operator.id)){
                //拖动多个算子
                let aDragOpe = [];
                aActiveOpeId.forEach(function (opeId) {
                   aDragOpe.push(oVars[opeId]);
                });

                dragOpes(aDragOpe);
            }else {
                //算子选中并拖动单个算子
                $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[this.props.operator.id]}});
                dragOpes([this.props.operator]);
            }
        }

        e.preventDefault();
        e.stopPropagation();
    },
    checkLineValid:function (currentVersion, deOpId, opId) {
        return Topologic.isConnect(currentVersion, deOpId, opId);
    },
    lineToNextOpe:function (e) {
        //左键
        if(e.button == 0){
            let aVars = this.props.currentVersion.meta.vars;
            let oCurOpe = this.props.operator;
            //记录可以连接上的当前算子
            let oLinedOpe = null;
            let oParPos = $('#painting').offset();

            //为了画面统一，起始点都要根据当前选中算子的位置进行计算出来
            let startX = oCurOpe.ui.left + 50;
            let startY = oCurOpe.ui.top + 68;
            let d=`M${startX} ${startY} C${startX} ${startY}, ${startX} ${startY}, ${startX} ${startY}`;

            //公共连线
            $('.commonLine').removeClass('hide').attr('d',d);

            $(document).on('mousemove.drawline',function (e) {
                let endX = e.pageX - oParPos.left;
                let endY = e.pageY - oParPos.top;
                let middleX = Math.floor((endX + startX)/2);

                d=`M${startX} ${startY} C${middleX} ${startY}, ${middleX} ${endY}, ${endX} ${endY}`;
                $('.commonLine').attr('d',d);

                //检查是否碰撞到其它算子的输入
                //遍历所有算子的位置
                for(let ope of aVars){
                    let xMin = ope.ui.left + 43;
                    let xMax = ope.ui.left + 57;
                    let yMin = ope.ui.top;
                    let yMax = ope.ui.top + 14;

                    if((endX>=xMin&&endX<=xMax)&&(endY>=yMin&&endY<=yMax)){
                        //为了画面统一，起始点都要根据当前选中算子的位置进行计算出来
                        let endResX = ope.ui.left + 50;
                        let endResY = ope.ui.top + 5;

                        d=`M${startX} ${startY} C${middleX} ${startY}, ${middleX} ${endResY}, ${endResX} ${endResY}`;
                        $('.commonLine').attr('d',d);

                        let $input = $('#'+this.props.currentVersion.id+'_'+ope.id).find('.inputPoint');
                        let pos = $input.offset();
                        //需要检查是否合法
                        if(this.checkLineValid(this.props.currentVersion,oCurOpe.id,ope.id)){
                            oLinedOpe = ope;
                            $('.linedTip').removeClass('hide').removeAttr('style').css({
                                left:pos.left,
                                top:pos.top
                            });
                            break;
                        }else {
                            $('.linedTip').removeClass('hide').removeAttr('style').css({
                                background:'red',
                                left:pos.left,
                                top:pos.top
                            });
                        }
                    }else {
                        oLinedOpe = null;
                    }
                }

                e.preventDefault();
            }.bind(this)).on('mouseup.drawline',function (e) {
                $(document).off('.drawline');

                //修改算子之间的依赖
                if(oLinedOpe){
                    //算子选中
                    $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[oLinedOpe.id]}});

                    //oCurOpe成为oLinedOpe的依赖
                    $('.operators').data('operatorSub').onNext({
                        type:"operatorPropschange",
                        data:{
                            opeId:oLinedOpe.id,
                            props:{dependencies:oLinedOpe.dependencies.concat([oCurOpe.id])}
                        }
                    });
                }

                $('.commonLine').addClass('hide');
                $('.linedTip').addClass('hide').removeAttr('style');
            }.bind(this));
        }

        e.stopPropagation();
        e.preventDefault();
    },
    nameEdit: function (e) {
        //显示编辑框并设置其位置
        let left = this.props.operator.ui.left + 10;
        let top = this.props.operator.ui.top + 26;
        let opeName = $(e.currentTarget).attr('data-name');
        let opeId = this.props.operator.id;
        this.props.updateOpeEditStatus(opeId,left,top,opeName,true);
        e.preventDefault();
    },
    opeContextMenu:function (e) {
        //得到所有选中的算子
        let aActiveOpe = new Set();
        this.props.currentOpe.forEach(function (ope) {
           aActiveOpe.add(ope.id);
        });
        aActiveOpe.add(this.props.operator.id);
        //算子选中
        $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:Array.from(aActiveOpe)}});

        let left = e.pageX;
        let top = e.pageY;

        //根据queue是否为空，决定是否有删除功能
        let aMenu = [{text:"添加到任务队列",callback:this.opeAddToQueue}];

        let oCurVer = this.props.currentVersion;
        let aQueue = oCurVer.meta.queue;
        //如果算子已在任务队列，则不需要再显示“添加到任务队列”菜单
        if(oCurVer&&aQueue.length>0&&aQueue.indexOf(this.props.operator.id)!=-1){
            aMenu.length = 0;
        }

        if(oCurVer&&aQueue.length==0){
            aMenu.push({text:"删除",callback:this.opeDel.bind(this,this.props.operator.id)});
        }

        if(aMenu.length>0){
            $('.contextmenu').data('contextMenuSub').onNext({
                type:"showContextMenu",
                data:{
                    left:left,
                    top:top,
                    display:true,
                    aMenu:aMenu
                }
            });
        }
    },
    opeAddToQueue:function () {
        //隐藏右键菜单
        this.hideContextMenu();

        //检查所有算子的命令行不能为空
        let isValid = true;
        let curOpe = null;
        let oVars = {};
        for(var ope of this.props.currentVersion.meta.vars){
            if(ope.cmd.length == 0){
                isValid = false;
                curOpe = ope;
            }

            //为下面遍历准备
            oVars[ope.id] = ope;
        }

        if(!isValid){
            //选中不合法算子
            $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[curOpe.id]}});
        }else {
            let aActiveOpe = new Set();
            this.props.currentOpe.forEach(function (ope) {
                aActiveOpe.add(ope.id);
            });

            //生成拓扑结构
            let queue = Topologic.addNodesToQueue(this.props.currentVersion, Array.from(aActiveOpe));
            let oOpeSub = $('.operators').data('operatorSub');
            //修改算子的状态为new的为open,避免它的有依赖的算子已经运行成功还要重新运行！
            queue.forEach(function (opeId) {
                if(oVars[opeId].status == 'new'){
                    oOpeSub.onNext({
                        type:"operatorPropschange",
                        data:{
                            opeId:opeId,
                            props:{
                                status:'open'
                            }
                        }
                    });
                }
            });

            //修改当前version的status为pending
            //增加当前拓扑结构到当前version的meta->queue[所有算子的id]
            oOpeSub.onNext({
                type:"addQueue",
                newQueue:queue
            });
        }
    },
    opeDel:function (opeId) {
        //隐藏右键菜单
        this.hideContextMenu();
        
        let aActiveOpe = new Set();
        this.props.currentOpe.forEach(function (ope) {
            aActiveOpe.add(ope.id);
        });

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
                        $('.operators').data('operatorSub').onNext({
                            type:"deleteoperator",
                            opeId:Array.from(aActiveOpe)
                        });

                        //触发保存
                        _.delay(function () {
                            $('.operators').data('operatorSub').onNext({
                                type: 'saveMetaToDB',
                                showTip:false
                            });
                        },30);
                    }
                }]
        }).showModal();
    },
    render: function () {
        let opeId = this.props.operator.id;
        //当前选中的版本
        let oCurVer = this.props.currentVersion;
        let isCanEdit = oCurVer&&oCurVer.meta.queue.length==0;

        //----------------------------算子根据不同状态绑定不同事件----------------------------------
        let fnOperator = {
            dragOperator: function (e) {
                //算子选中
                $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:[opeId]}});
                e.preventDefault();
            },
            opeContextMenu: function (e) {
                e.preventDefault();
            },
            nameEdit: $.noop,
            lineToNextOpe:$.noop,
        };
        //根据当前queue是否为空决定是否有右击事件
        if(isCanEdit){
            fnOperator.dragOperator = this.dragOperator;
            fnOperator.nameEdit = this.nameEdit;
            fnOperator.lineToNextOpe = this.lineToNextOpe;
        }

        //右键菜单添加到队列是当全局队列中没有currentVersion的id时可以显示
        if(oCurVer){
            let oQueue = this.props.queue.find(oVer=>{return oVer.id == oCurVer.id});
            if(!oQueue){
                fnOperator.opeContextMenu = this.opeContextMenu;
            }else {
                fnOperator.opeContextMenu = function (e) {
                    e.preventDefault();
                };
            }
        }
        //----------------------------end----------------------------------

        //-----------------------------算子的不同状态-----------------------------------------
        //当前算子与选中算子相同
        let selected = "#000000";
        //可编辑时,选中的当前元素
        if(this.props.currentOpe.length>0&&isCanEdit){
            selected = this.props.currentOpe.find(ope => ope.id == this.props.operator.id) ? "#2A00C7" : "#000000";
        }

        //禁止编辑时的状态
        if(!isCanEdit){
            selected = "#9f9f9f";
        }

        //区分是否在任务队列中的算子
        let aTaskQueue = this.props.currentVersion.meta.queue;
        if(aTaskQueue.length>0&&aTaskQueue.indexOf(this.props.operator.id) == -1){
            selected = "#85c7fe";
        }
        //------------------------------end----------------------------------------------


        //----------------------------算子名称保持4个中文，8个英文的长度----------------------------
        let name = this.props.operator.name;
        let sName = Tools.getStrLen(name) > 8 ? Tools.getStrByLen(name,8) + '…' : name;
        let sTransform = `translate(${this.props.operator.ui.left},${this.props.operator.ui.top})`;
        //----------------------------end----------------------------

        return (
            <g transform={sTransform} id={oCurVer.id+'_'+this.props.operator.id} onMouseDown={fnOperator.dragOperator} onContextMenu={fnOperator.opeContextMenu}>
                <circle className="inputPoint" fill={selected} cx="51" cy="6" r="8"/>
                <circle className="outputPoint" fill={selected} cx="51" cy="69" r="8" onMouseDown={fnOperator.lineToNextOpe}/>
                <polyline fill="#FFFFFF" stroke={selected} stroke-miterlimit="10"
                          points="51.3,66.6 1.3,45.1 1.3,30 51.3,8.5 1.3,30 51.3,8.5 101.3,30 101.3,45.1 51.3,66.6"/>
                <text transform="matrix(1 0 0 1 24 41.89)"
                      onDoubleClick={fnOperator.nameEdit} fill={selected} dx="2em" data-name={name} textAnchor="middle">{sName}</text>
            </g>
        )
    }
});

export default OperatorView;