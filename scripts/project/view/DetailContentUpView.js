/**
 * Created by anchao on 2016/5/26.
 */

import LeftPanelView from './LeftPanelView';
import RightPanelView from './RightPanelView';
import CenterPanelView from './CenterPanelView';

let DetailContentUp = React.createClass({
    layoutModifyLeftAndRight:function (direction,value,evName) {
        //修改左右宽度
        let layout = this.props.layout;
        let max = layout[direction].width.MAX;
        let min = layout[direction].width.MIN;

        //取值在[min,max]之间
        value = value>max?max:value<min?min:value;

        //记忆原始宽度,待展开时用
        if(evName == 'mousedown'){
            layout[direction].width.beforeMIN = value;
        }

        //鼠标抬起时检查
        if(evName == 'mouseup'){
            //左边栏宽度<=50时自动收缩
            value = value<=50?0:value;
        }

        if(evName == 'expand'){
            layout[direction].width.current = layout[direction].width.beforeMIN;
        }else if(evName == 'collapse'){
            //记忆当前宽度
            layout[direction].width.beforeMIN = layout[direction].width.current;
            layout[direction].width.current = 0;
        }else {
            layout[direction].width.current = value;
        }

        this.props.updateLayout(layout);
    },
    render:function () {
        let bottom = this.props.layout.bottom;
        let upHeight = `calc(100% - ${bottom.height.current}px)`;

        return (
            <div className="whale-project-content-up" style={{height:upHeight}}>
                <LeftPanelView currentVersion={this.props.currentVersion} queue={this.props.queue} versions={this.props.versions}  layout={this.props.layout} modifyLeftAndRight={this.layoutModifyLeftAndRight} />
                <RightPanelView currentVersion={this.props.currentVersion} currentOpe={this.props.currentOpe} queue={this.props.queue} layout={this.props.layout} modifyLeftAndRight={this.layoutModifyLeftAndRight} />
                <CenterPanelView currentVersion={this.props.currentVersion} currentOpe={this.props.currentOpe} queue={this.props.queue} layout={this.props.layout} />
            </div>
        )
    }
});

export default DetailContentUp;