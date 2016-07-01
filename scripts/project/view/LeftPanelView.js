/**
 * Created by anchao on 2016/5/27.
 */

import VersionListView from './VersionListView';
import QueueView from './QueueView';

let LeftPanelView = React.createClass({
    getInitialState: function () {
        return {
            leftDisX: 0,
            active: 'version',
            title: '版本列表'
        }
    },
    componentDidMount: function () {
        //左面板的订阅对象
        let leftPanelSub = new Rx.Subject();

        leftPanelSub.subscribe(function (oData) {
            switch (oData.type) {
                case "expandLeftPanel":
                    this.expandLeftPanel();
                    break;
                case "collapseLeftPanel":
                    this.collapseLeftPanel();
                    break;
            }
        }.bind(this));

        //绑定在左侧面板上,供centerPanel调用
        $('.app-content-left').data('leftPanelSub', leftPanelSub);

        //左侧面板active记忆到本地存储中
        let leftStatus = window.localStorage.getItem('leftStatus');
        if(leftStatus){
            leftStatus = JSON.parse(leftStatus);
            this.setState({
                active:leftStatus.active,
                title:leftStatus.title
            });
        }
    },
    switchChange: function (e) {
        let index = $(e.currentTarget).index();
        switch (index) {
            case 0:
                this.setState({
                    active: 'version',
                    title: $(e.currentTarget).attr('title')
                },function () {
                    window.localStorage.setItem('leftStatus',JSON.stringify(this.state));
                });
                break;
            case 1:
                this.setState({
                    active: 'glQueue',
                    title: $(e.currentTarget).attr('title')
                },function () {
                    window.localStorage.setItem('leftStatus',JSON.stringify(this.state));
                });
                break;
        }
    },
    haveOrRemoveActive: function (e) {
        //全局队列点击
        $(e.currentTarget).toggleClass('active')
            .siblings().removeClass('active');
    },
    leftSectionWidthChange: function (e) {
        if(e.button == 0){
            //修改左侧宽度
            let $target = $(e.currentTarget);
            let leftDisX = e.pageX - $target.position().left;

            this.setState({
                leftDisX: leftDisX
            });

            //记录拖动前的width
            let leftW = $(e.currentTarget).parent().width();
            this.props.modifyLeftAndRight('left', leftW, 'mousedown');

            $(document).on('mousemove.leftchange', function (e) {
                let leftW = e.pageX - this.state.leftDisX + 10;
                this.props.modifyLeftAndRight('left', leftW);
                e.preventDefault();
            }.bind(this))
                .on('mouseup.leftchange', function (e) {
                    let leftW = e.pageX - this.state.leftDisX + 10;
                    this.props.modifyLeftAndRight('left', leftW, 'mouseup');

                    $(e.currentTarget).off('.leftchange');
                }.bind(this));
        }
    },
    expandLeftPanel: function () {
        //展开左侧
        this.props.modifyLeftAndRight('left', 360, 'expand');
    },
    collapseLeftPanel: function () {
        //关闭左侧
        this.props.modifyLeftAndRight('left', 0, 'collapse');
    },
    render: function () {
        let versionTitleCls = this.state.active == 'version' ? 'whale-app-panel-button active' : 'whale-app-panel-button';
        let glQueueTitleCls = this.state.active == 'glQueue' ? 'whale-app-panel-button active' : 'whale-app-panel-button';
        let left = this.props.layout.left;

        return (
            <div className="app-content-left" style={{width:left.width.current}}>
                <div className="whale-app-panelTitle"><a href="javascript:;"
                                                             className={versionTitleCls} title="版本列表"
                                                             onClick={this.switchChange}><span
                    className="glyphicon icon-model"></span></a><a href="javascript:;"
                                                                   className={glQueueTitleCls}
                                                                   title="全局任务" onClick={this.switchChange}><span
                    className="glyphicon icon-parameter"></span></a><a href="javascript:;"
                                                                  className="whale-app-panel-button-special pull-right"
                                                                  onClick={this.collapseLeftPanel}><span
                    className="glyphicon icon-delete"></span></a>
                    <div className="app-left-panelTitle pull-right">{this.state.title}</div>
                </div>
                <div className="whale-app-panelContent">
                    <VersionListView versions={this.props.versions} currentVersion={this.props.currentVersion} queue={this.props.queue} display={this.state.active} />
                    <QueueView currentVersion={this.props.currentVersion} queue={this.props.queue} active={this.state.active} />
                </div>
                <div className="drag-horizontal-line-extend" onMouseDown={this.leftSectionWidthChange}></div>
                <div className={left.width.current<=0?'drag-horizontal-line-change':'drag-horizontal-line-change hide'}
                     onClick={this.expandLeftPanel}><span className="caret pullToleft"></span></div>
            </div>
        )
    }
});

export default LeftPanelView;