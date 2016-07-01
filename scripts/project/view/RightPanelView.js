/**
 * Created by anchao on 2016/6/2.
 */

import SettingPanelView from './SettingPanelView';

let RightPanelView = React.createClass({
    getInitialState: function () {
        return {
            rightDisX:0
        }
    },
    componentDidMount:function () {
        //右面板的订阅对象
        let rightPanelSub = new Rx.Subject();

        rightPanelSub.subscribe(function (oData) {
            switch (oData.type) {
                case "expandRightPanel":
                    this.expandRightPanel();
                    break;
                case "collapseRightPanel":
                    this.collapseRightPanel();
                    break;
            }
        }.bind(this));

        //绑定在右侧面板上,供centerPanel调用
        $('.app-content-right').data('rightPanelSub',rightPanelSub);
    },
    rightSectionWidthChange: function (e) {
        if(e.button == 0){
            //右侧面板宽度变化
            let $target = $(e.currentTarget);
            let rightDisX = e.pageX - $target.position().left;

            this.setState({
                rightDisX: rightDisX
            });

            //记录拖动前的width
            let rightWidth = $(e.currentTarget).parent().width();
            this.props.modifyLeftAndRight('right', rightWidth, 'mousedown');

            $(document).on('mousemove.rightchange', function (e) {
                let rightW = rightWidth - (e.pageX - this.state.rightDisX);
                this.props.modifyLeftAndRight('right', rightW);
                e.preventDefault();
            }.bind(this))
                .on('mouseup.rightchange', function (e) {
                    let rightW = rightWidth - (e.pageX - this.state.rightDisX);
                    this.props.modifyLeftAndRight('right', rightW, 'mouseup');

                    $(e.currentTarget).off('.rightchange');
                }.bind(this));
        }
    },
    expandRightPanel:function () {
        //展开右侧面板
        this.props.modifyLeftAndRight('right',360,'expand');
    },
    collapseRightPanel: function () {
        //关闭右侧面板
        this.props.modifyLeftAndRight('right', 0, 'collapse');
    },
    render: function () {
        let right = this.props.layout.right;
        return (
            <div className="app-content-right" style={{width:right.width.current}}>
                <div className="whale-app-panelTitle">
                    <div className="app-right-panelTitle pull-left">参数</div>
                    <div className="pull-right"><a href="javascript:;"
                                                   className="whale-app-panel-button-special"
                                                   onClick={this.collapseRightPanel}><span
                        className="glyphicon icon-delete"></span></a></div>
                </div>
                <div className="whale-app-panelContent">
                    <SettingPanelView currentVersion={this.props.currentVersion} currentOpe={this.props.currentOpe} queue={this.props.queue} />
                </div>
                <div className="drag-horizontal-line-extend" onMouseDown={this.rightSectionWidthChange}></div>
                <div className={right.width.current<=0?'drag-horizontal-line-change':'drag-horizontal-line-change hide'} onClick={this.expandRightPanel}><span className="caret pullToleft"></span></div>
            </div>
        );
    }
});

export default RightPanelView;