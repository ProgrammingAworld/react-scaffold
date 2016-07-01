/**
 * Created by anchao on 2016/5/26.
 */

import OperatorView from './OperatorView';

let PaintingView = React.createClass({
    getInitialState: function () {
        return {
            operatorId:"",
            operatorLeft: 0,
            operatorTop: 0,
            operatorName:"",
            operatorEdit: false
        };
    },
    updateOpeEditStatus: function (opeId,left,top,opeName,bShow) {
        //算子编辑状态
        this.setState({
            operatorId:opeId,
            operatorLeft: left,
            operatorTop: top,
            operatorName:opeName,
            operatorEdit: bShow
        },function () {
            //编辑框自动获得焦点
            if(bShow){
                _.delay(function () {
                    $('.operatorname input').focus();
                },30);
            }
        });
    },
    showContextMenu: function (e) {
        if($(e.target).is('svg')){
            let left = e.pageX;
            let top = e.pageY;
            let aMenu = [{text:"新建算子",callback:this.createTask}];

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
        e.preventDefault();
    },
    hideContextMenu: function (e) {
        if($(e.target).is('svg')){
            //隐藏右键菜单
            this.onlyHideContextMenu();

            //算子取消选中
            $('.operators').data('operatorSub').onNext({type:"unselectedope"});

            //隐藏算子名称的编辑状态
            this.setState({
                operatorEdit:false
            });
        }
    },
    onlyHideContextMenu:function () {
        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                display:false
            }
        });
    },
    createTask: function () {
        //隐藏右键菜单
        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                display:false
            }
        });

        if(this.props.currentVersion){
            //创建一个算子
            $('.operators').data('operatorSub').onNext({
                type: 'createoperator'
            });
        }
    },
    opeNameChange: function (e) {
        //修改数据源
        let newName = e.currentTarget.value;
        this.setState({
            operatorName:newName
        });
    },
    nameDisableEdit: function (e) {
        //不能为空和重名
        let $target = $(e.currentTarget);
        let newName = $target.val();
        let bFind = false;

        //重名检查
        for(var ope of this.props.currentVersion.meta.vars){
            if(ope.name == newName&&ope.id!=this.state.operatorId){
                bFind = true;
                break;
            }
        }

        if($.trim(newName).length == 0){
            dialog.alert("算子名称不能为空！","warning");
        } else if(bFind) {
            dialog.alert("当前算子与其它算子重名！","warning");
        }else{
            //修改数据源
            let opeId = this.state.operatorId;
            $('.operators').data('operatorSub').onNext({
                type: 'operatorPropschange',
                data: {opeId:opeId, props:{name: newName}}
            });

            this.setState({
                operatorName:"",
                operatorEdit: false
            });
        }
    },
    toLineHeavier:function (e) {
        $(e.currentTarget).attr('stroke-width',5);
    },
    toLineNormal:function (e) {
        $(e.currentTarget).attr('stroke-width',1);
    },
    lineContextMenu:function (e) {
        let $target = $(e.currentTarget);
        let left = e.pageX;
        let top = e.pageY;
        let opeId = $target.data('endopeid');
        let depId = $target.data('startopeid');
        let aMenu = [{text:"删除",callback:this.deleteDepById.bind(this,opeId,depId)}];

        $('.contextmenu').data('contextMenuSub').onNext({
            type:"showContextMenu",
            data:{
                left:left,
                top:top,
                display:true,
                aMenu:aMenu
            }
        });
    },
    deleteDepById:function (opeId,depId) {
        this.onlyHideContextMenu();
        let aVars = this.props.currentVersion.meta.vars.map(function (ope) {
            if(ope.id == opeId){
                ope.dependencies = _.without(ope.dependencies,depId);
            }
            return ope;
        });


        $('.operators').data('operatorSub').onNext({
            type:"operatorPropschange",
            data:{
                props:{
                    meta:{
                        vars:aVars,
                        queue:this.props.currentVersion.meta.queue
                    }
                }
            }
        });

        //触发保存
        _.delay(function () {
            $('.operators').data('operatorSub').onNext({
                type: 'saveMetaToDB',
                showTip:false
            });
        },30);
    },
    dragArea:function (e) {
        if(e.button == 0){
            let $target = $(e.currentTarget);
            let $selectDiv = $('.selectDiv');
            let oOffset = $target.offset();
            let aSelectdOpeId = new Set();

            //起始位置
            let startX = e.pageX - oOffset.left;
            let startY = e.pageY - oOffset.top;

            $(document).on('mousemove.dragArea',function (ev) {
                //终止位置
                let endX = ev.pageX - oOffset.left;
                let endY = ev.pageY - oOffset.top;

                $selectDiv.removeClass('hide');
                if(endX>startX){
                    $selectDiv.css({
                        left:startX,
                        width:endX - startX
                    });
                }else {
                    $selectDiv.css({
                        left:endX,
                        width:startX - endX
                    });
                }

                if(endY>startY){
                    $selectDiv.css({
                        top:startY,
                        height:endY - startY
                    });
                }else {
                    $selectDiv.css({
                        top:endY,
                        height:startY - endY
                    });
                }

                this.props.currentVersion.meta.vars.forEach(function (ope) {
                    let opeX = ope.ui.left;
                    let opeY = ope.ui.top;
                    let opeX2 = opeX + 100;
                    let opeY2 = opeY + 80;

                    let oSelectPos = $selectDiv.position();
                    let oSelectWidth = $selectDiv.width();
                    let oSelectHeight = $selectDiv.height();

                    let minLeft = oSelectPos.left;
                    let maxLeft = oSelectPos.left + oSelectWidth;
                    let minTop = oSelectPos.top;
                    let maxTop = oSelectPos.top + oSelectHeight;

                    if(opeX2<minLeft||opeX>maxLeft||opeY2<minTop||opeY>maxTop){
                        aSelectdOpeId.delete(ope.id);
                    }else {
                        aSelectdOpeId.add(ope.id);
                    }
                });

                //选中相应算子
                $('.operators').data('operatorSub').onNext({type:"selectedope",data:{opeId:Array.from(aSelectdOpeId)}});
            }.bind(this)).on('mouseup.dragArea',function () {
                $selectDiv.addClass('hide');
                $(this).off('.dragArea');
            });

            this.hideContextMenu(e);
        }

        e.preventDefault();
        e.stopPropagation();
    },
    render: function () {
        //画出所有算子
        let aOper = [];
        //画出所有连线
        let aLines = [];
        //右键菜单事件
        let fnDefault = function (e) {
            e.preventDefault();
        };
        let fnPainting = {
            showContextMenu:fnDefault,
            dragArea:function (e) {
                this.hideContextMenu(e);
                e.preventDefault();
            }.bind(this)
        };
        //当前选中的版本
        let oCurVer = this.props.currentVersion;

        //根据当前算子列表画出所有算子和所有连线
        if(oCurVer&&!$.isEmptyObject(oCurVer.meta)){
            //所有算子
            oCurVer.meta.vars.forEach(function (ope, index) {
                //当前算子对象和右键菜单功能
                let opeData = {
                    queue:this.props.queue,
                    currentVersion:this.props.currentVersion,
                    currentOpe:this.props.currentOpe,
                    operator:ope
                };

                aOper.push(<OperatorView key={oCurVer.id+'_'+ope.id} nameEdit={false}
                                         updateOpeEditStatus={this.updateOpeEditStatus} {...opeData}  />);
            }.bind(this));


            //所有连线
            oCurVer.meta.vars.forEach(function (oCurOpe, index) {
                if(oCurOpe.dependencies.length>0){
                    //根据任务队列中数组是否为空，决定连线的颜色
                    let canEdit = oCurVer.meta.queue.length == 0;
                    let lineColor = "#000000";
                    let fnLines = {
                        toLineHeavier:this.toLineHeavier,
                        toLineNormal:this.toLineNormal,
                        lineContextMenu:this.lineContextMenu
                    }

                    if(!canEdit){
                        lineColor = "#9f9f9f";
                        fnLines = {
                            toLineHeavier:$.noop,
                            toLineNormal:$.noop,
                            lineContextMenu:$.noop
                        }
                    }

                    oCurOpe.dependencies.forEach(function (depOPeId,i) {
                        //depOpe的输出画到当前算子的输入
                        let depOpe = oCurVer.meta.vars.filter(function (obj) {
                            return obj.id == depOPeId;
                        })[0];

                        //为了画面统一，起始点都要根据当前选中算子的位置进行计算出来
                        let startX = depOpe.ui.left + 50;
                        let startY = depOpe.ui.top + 68;

                        let endResX = oCurOpe.ui.left + 50;
                        let endResY = oCurOpe.ui.top + 5;

                        let middleX = Math.floor((startX + endResX)/2);

                        let d=`M${startX} ${startY} C${middleX} ${startY}, ${middleX} ${endResY}, ${endResX} ${endResY}`;
                        aLines.push(<path key={oCurVer.id+'_'+oCurOpe.id+'_'+depOPeId+'_'+i} data-startopeid={depOpe.id} data-endopeid={oCurOpe.id} onMouseEnter={fnLines.toLineHeavier} onMouseLeave={fnLines.toLineNormal} onContextMenu={fnLines.lineContextMenu} d={d} stroke={lineColor} fill="none" stroke-width="1"></path>);
                    }.bind(this));
                }
            }.bind(this));
        }

        //根据当前queue决定是否有右击事件
        if(oCurVer&&!$.isEmptyObject(oCurVer.meta)&&oCurVer.meta.queue.length==0){
            fnPainting.showContextMenu = this.showContextMenu;
            fnPainting.dragArea = this.dragArea;
        }

        //编辑算子名称时必须保证算子不为Null
        let opeEditCls = this.state.operatorEdit ? 'operatorname' : 'operatorname hide';
        let operatorsCls = oCurVer ? "operators" : "operators disablePaint";

        return (
            <div id="painting">
                <div className={operatorsCls} onMouseDown={fnPainting.dragArea} onContextMenu={fnPainting.showContextMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        {aLines}
                        {aOper}
                        <path className="commonLine hide" d="M0 0 C0 0, 0 0, 0 0" stroke="#000000" fill="none" stroke-width="1"></path>
                    </svg>
                </div>
                <div className={opeEditCls} style={{left:this.state.operatorLeft,top:this.state.operatorTop}}>
                    <input type="text" value={this.state.operatorName} onChange={this.opeNameChange}
                           onBlur={this.nameDisableEdit}/>
                </div>
                <div className="linedTip hide"></div>
                <div className="selectDiv hide"></div>
            </div>
        );
    }
});

export default PaintingView;