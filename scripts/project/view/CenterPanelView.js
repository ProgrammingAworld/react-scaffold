/**
 * Created by anchao on 2016/6/2.
 */

import PaintingView from './PaintingView';

let CenterPanelView = React.createClass({
    collapseLeftAndRightPanel:function (e) {
        e.preventDefault();
        e.stopPropagation();

        if(!$(e.target).is('.whale-app-panelTitle')){
            return;
        }

        //打开或关闭左右下面板
        let leftW = this.props.layout.left.width.current;
        let rightW = this.props.layout.right.width.current;
        let bottomH = this.props.layout.bottom.height.current;
        let max = $(e.currentTarget).parent().parent().height();

        if(leftW != 0&&rightW != 0&&bottomH != 0){
            $('.app-content-left').data('leftPanelSub').onNext({type:"collapseLeftPanel"});
            $('.app-content-right').data('rightPanelSub').onNext({type:"collapseRightPanel"});

            $('.operators').data('bottomPanelSub').onNext({
                type:"modifyBottom",
                data:{
                    value:200,
                    max:max,
                    evName:'collapse'
                }
            });
        }else if(leftW ==0&&rightW == 0&&bottomH==0) {
            $('.app-content-left').data('leftPanelSub').onNext({type:"expandLeftPanel"});
            $('.app-content-right').data('rightPanelSub').onNext({type:"expandRightPanel"});

            $('.operators').data('bottomPanelSub').onNext({
                type:"modifyBottom",
                data:{
                    value:200,
                    max:max,
                    evName:'expand'
                }
            });
        }else {
            if(leftW!=0){
                $('.app-content-left').data('leftPanelSub').onNext({type:"collapseLeftPanel"});
            }

            if(rightW!=0){
                $('.app-content-right').data('rightPanelSub').onNext({type:"collapseRightPanel"});
            }

            if(bottomH!=0){
                $('.operators').data('bottomPanelSub').onNext({
                    type:"modifyBottom",
                    data:{
                        value:200,
                        max:max,
                        evName:'collapse'
                    }
                });
            }
        }
    },
    render:function () {
        let left = this.props.layout.left;
        let right = this.props.layout.right;
        let centerW = `calc(100% - ${left.width.current}px - ${right.width.current}px)`;
        let verId = this.props.currentVersion? 'DAGId：'+this.props.currentVersion.DAGId:null;

        return (
            <div className="app-content-center" style={{width:centerW,marginLeft:left.width.current}}>
                <div className="whale-app-panelTitle" onDoubleClickCapture={this.collapseLeftAndRightPanel}>
                    <div className="pull-left" style={{marginLeft:10}}>{verId}</div>
                </div>
                <div className="whale-app-panelContent">
                    <PaintingView currentVersion={this.props.currentVersion} currentOpe={this.props.currentOpe} queue={this.props.queue} />
                </div>
            </div>
        );
    }
});

export default CenterPanelView;