/**
 * Created by anchao on 17-3-1.
 */

import $ from 'jquery';
import React from 'react';
import Immutable from 'immutable';
import Checkbox from './Checkbox';
import ReactComponentBase from 'base/ReactComponentBase';

export default class Tree extends ReactComponentBase {
    constructor(props) {
        super(props);

        this.state = {
            secMenuShow: false,
            contextMenuData: [],
            contextMenuX: 0,
            contextMenuY: 0,
            contextMenuShow: false,
            currentNode: null,
            moveNode: {
                id: 0,
                x: 0,
                y: 0,
                show: false
            }
        };

        //覆盖基类
        // this.shouldComponentUpdate = this.shouldComponentUpdateOverride.bind(this);
        //解析树结构
        this.loadTree = this.loadTree.bind(this);
        //右键菜单
        this.showContextMeun = this.showContextMeun.bind(this);
        //节点打开或收缩
        this.expandOrCollTreeNode = this.expandOrCollTreeNode.bind(this);
        //获得文件内容
        this.getFileContent = this.getFileContent.bind(this);
        //拖拽节点
        this.onDragStart = this.onDragStart.bind(this);
        //节点checkbox修改
        this.checkboxChange = this.checkboxChange.bind(this);
    }


    static defaultProps = {
        showCheckbox: false,
        contextmenu: [],
        list: Immutable.List(),
        showContextMeun: () => {
        },
        expandOrCollTreeNode: () => {
        },
        getFileContent: () => {
        },
        onDragStart: () => {
        },
        checkboxChange: () => {
        }
    }

    componentDidMount() {
        $('.datasettree_ml').data('publicFn', {
            hideContexMenu: show => {
                this.stateChange('contextMenuShow', show);
            }
        });
    }

    shouldComponentUpdateOverride(nextProps, nextState) {
        let list = this.props.list;
        let listNew = nextProps.list;

        return !list.equals(listNew) || Immutable.fromJS(this.state).equals(Immutable.fromJS(nextState));
    }

    showContextMeun(e, node) {
        e.preventDefault();
    }

    expandOrCollTreeNode(e, node) {
        e.preventDefault();
        e.stopPropagation();

        let {expandOrCollTreeNode} = this.props;
        let classes = node.get('classes');
        let id = node.get('id');
        let open = node.get('open');

        //根目录和文件不执行收缩，执行获取内容
        if (classes == 0) {
            return;
        } else {
            if (!open) {
                expandOrCollTreeNode(id, true);
            } else {
                expandOrCollTreeNode(id, false);
            }
        }
    }

    getFileContent(e, node) {
        let classes = node.get('classes');
        let nodeName = node.get('nodeName');
        let {getFileContent} = this.props;

        //文件类型执行，目录不执行
        if (classes == 0) {
            let filePath = node.get('path');
            getFileContent(filePath);
        }
    }

    onDragStart(e, node) {
        e.preventDefault();

        this.props.onDragStart(e, node);
    }

    checkboxChange(e, value, checked) {
        this.props.checkboxChange(value, checked);
        e.stopPropagation();
    }

    loadTree(pid, showCheckbox) {
        //classes:1文件夹，0文件
        let list = this.props.list;
        if (list.size == 0) {
            return null;
        }

        let index = -1;
        let children = Immutable.List();

        list.forEach((item, i) => {
            //找到当前节点父节点索引
            if (item.get('id') == pid) {
                index = i;
            }

            //找到所有的子元素
            if (item.get('parent') == pid) {
                children = children.push(<li key={pid + "树节点" + item.get('nodeName') + '-' + item.get('id')}
                                             className="normalnode">{this.loadTree(item.get('id'), showCheckbox)}</li>);
            }
        });

        if (index == -1) {
            return null;
        }

        //父节点
        let pNode = list.get(index);
        let nodeId = pNode.get("id");
        let nodeName = pNode.get("nodeName");
        let open = pNode.get("open");
        let checked = pNode.get('checked');

        //创建节点标题
        let nodetitleFn = () => {
            let leafCls = "";
            let nodeTitleCls = "nodetitle";
            let arrowCls = "fa fa-angle-right fa-fw fa-lg";

            if (pNode.get('classes') == 1) {
                leafCls = "fa fa-folder-o fa-fw fa-lg";
                leafCls = open ? "fa fa-folder-open-o fa-fw fa-lg" : leafCls;
                arrowCls = open ? "fa fa-angle-down fa-fw fa-lg" : arrowCls;
            } else {
                leafCls = "fa fa-file-text-o fa-fw fa-lg";
                nodeTitleCls = open ? "nodetitle active" : nodeTitleCls;
                arrowCls += " invisible";
            }

            //根节点特殊处理
            // leafCls = pid == 1 ? "fa fa-folder-open-o fa-fw fa-lg" : leafCls;
            // arrowCls = pid == 1 ? "fa fa-angle-down fa-fw fa-lg" : arrowCls;

            return <div className={nodeTitleCls}
                        onClick={e => this.expandOrCollTreeNode(e, pNode)}
                        onDoubleClick={e => this.getFileContent(e, pNode)}
                        onContextMenu={e => this.showContextMeun(e, pNode)}
                        onMouseDown={e => this.onDragStart(e, pNode)}><i className={arrowCls}></i>{showCheckbox ?
                <Checkbox value={nodeId} checked={checked}
                          checkedChange={e => this.checkboxChange(e, nodeId, !checked)}/> : null}<i
                className={leafCls}></i>{nodeName}</div>;
        }

        if (children.size > 0) {
            let liClsName = "normalnode";
            let ulCls = "";

            if (open) {
                liClsName = "normalnode opennode";
            } else {
                liClsName = "normalnode closenode";
                ulCls = "hide";
            }

            //根目录永远打开
            // ulCls = pid == 1 ? "" : ulCls;

            //目录
            return (
                <ul className="list-unstyled clearfix">
                    <li className={liClsName}>
                        {nodetitleFn()}
                        <ul className={ulCls}>{children}</ul>
                    </li>
                </ul>
            );
        } else {
            //叶子节点
            return nodetitleFn();
        }
    }

    render() {
        let showCheckbox = this.props.showCheckbox;

        return (
            <div className="datasettree_ml">
                {this.loadTree(1, showCheckbox)}
            </div>
        );
    }
}