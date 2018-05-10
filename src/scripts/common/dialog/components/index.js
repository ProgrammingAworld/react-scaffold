import React from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    Button
} from 'antd'
import classNames from 'classnames/bind'

const noop = function () {}

function Dialog(props) {
    const {
        dialogType, infoType, title, content, mousePosition, width, footer, show,
        ok, cancel
    } = props
    let footerNew = footer
    let contentSec = content
    let infoTypeCls = 'dialog-info'

    switch (dialogType) {
    case 'normal':
        break
    case 'confirm':
        footerNew = [
            <Button
                key="cancel"
                type="default"
                className="dialog-cancel"
                onClick={cancel}
            >取消
            </Button>,
            <Button
                key="confirm"
                type="primary"
                className="dialog-confirm"
                onClick={ok}
            >确认
            </Button>
        ]
        break;
    case 'alert':
        footerNew = [
            <Button
                key="confirm"
                type="primary"
                className="dialog-confirm"
                onClick={ok}
            >确认
            </Button>
        ]

        if (infoType === 'success') {
            contentSec = (
                <div>
                    <div className="pull-left"><i className="fa fa-check fa-lg text-success" />&nbsp;&nbsp;</div>
                    {content}
                </div>)
        } else if (infoType === 'warning') {
            contentSec = (
                <div>
                    <div className="pull-left"><i className="fa fa-exclamation-triangle fa-lg text-warning" />&nbsp;&nbsp;</div>
                    {content}
                </div>)
        } else if (infoType === 'error') {
            contentSec = (
                <div>
                    <div className="pull-left"><i className="fa fa-close fa-lg text-danger" />&nbsp;&nbsp;</div>
                    {content}
                </div>)
        } else {
            contentSec = (
                <div>
                    <div className="pull-left"><i className="fa fa-info fa-lg text-info" />&nbsp;&nbsp;</div>
                    {content}
                </div>)
        }

        infoTypeCls = `dialog-${infoType}`
        break;
    default:
        break;
    }

    return (
        <Modal
            className={classNames({ 'dialog-common': true, [infoTypeCls]: dialogType === 'alert' })}
            title={title}
            footer={footerNew}
            mousePosition={mousePosition}
            visible={show}
            wrapClassName="dialogwapper"
            width={width}
            onOk={ok}
            onCancel={cancel}
        >
            {
                contentSec
            }
        </Modal>
    )
}

/*
  @dialogType: 弹窗类型
  @infoType: alert弹窗时不同的展示类型
  @width: 弹窗的宽度
  @title：弹窗标题
  @content：弹窗内容
  @mousePosition：动画起始原始点
  @show: 是否显示弹窗
  @ok: 确定按钮回调函数
  @cancel: 取消按钮回调函数
 */

Dialog.propTypes = {
    dialogType: PropTypes.oneOf(['normal', 'alert', 'confirm']),
    infoType: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
    title: PropTypes.string,
    content: PropTypes.element,
    width: PropTypes.number,
    footer: PropTypes.array,
    mousePosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    show: PropTypes.bool,
    ok: PropTypes.func,
    cancel: PropTypes.func
}

Dialog.defaultProps = {
    dialogType: 'confirm',
    title: '标题',
    content: null,
    infoType: 'info',
    footer: [],
    mousePosition: { x: 0, y: 0 },
    width: 500,
    show: false,
    ok: noop,
    cancel: noop
}

export default Dialog
