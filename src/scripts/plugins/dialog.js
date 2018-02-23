/* dialog扩展 */
var $ = require('jquery')
var _ = require('lodash')
require('./dialog-plus.js')

$.extend(dialog, {
  topIndex: function () {
        // 顶级zIndex
    if (_.isEmpty(dialog) || _.isEmpty(dialog.list)) return 2014
    var indexArr = []
    $.each(dialog.list, function (i, n) {
      indexArr.push(n.zIndex)
    })
    return _(indexArr).max() + 1
  },
  alert: function (content, type = 'info', fnSuccess = function () {

  }) {
    var title

    if (type == 'success') {
      title = '成功'
      content = '<i class="fa fa-check fa-lg text-success"></i><span class="text-success">' + content + '</span>'
    } else if (type == 'warning') {
      title = '提醒'
      content = '<i class="fa fa-exclamation-triangle fa-lg text-warning"></i><span class="text-warning">' + content + '</span>'
    } else if (type == 'error') {
      title = '出错'
      content = '<i class="fa fa-close fa-lg text-danger"></i><span class="text-danger">' + content + '</span>'
    } else {
      title = '消息'
      content = '<i class="fa fa-info fa-lg text-info"></i><span class="text-center text-info">' + content + '</span>'
    }

        // 关闭已有提示窗
    if (dialog.get('Alert')) {
      dialog.get('Alert').close()
    }

        // 关闭loadingdiv
    if (dialog.get('loadingdiv')) {
      dialog.get('loadingdiv').close()
    }

    var options = {
      title: title,
      id: 'Alert',
      zIndex: dialog.topIndex(),
      fixed: true,
      padding: '15px 30px',
      content: '<div class="dialogAlert" style="max-width: 500px;max-height: 500px;overflow: auto">' + content + '</div>',
      okValue: '确定',
      ok: fnSuccess
    }

    return dialog(options).showModal()
  },
  confirm: function (options) {
    options = $.extend({
      title: '提醒',
      content: '您确定要执行本操作？',
      zIndex: dialog.topIndex(),
      fixed: true,
      padding: '15px 30px',
      cancelValue: '取消',
      cancel: true,
      okValue: '确定',
      ok: true
    }, options)

    options.content = '<span class="artui-dialog-confirm"></span><span>' + options.content + '</span>'
    return dialog(options).showModal()
  },
  open: function (title, content, aButton, fnCb) {
    return dialog({
      title: title,
      content: content,
      button: aButton,
      onshow: function () {
                // 重新设置主要内容区域
        this.content(content)
        if (fnCb && typeof fnCb === 'function') {
          fnCb(this)
        }
      }
    }).showModal()
  },
  loading: function () {
    return dialog({
      id: 'loadingdiv',
      lock: true,
      zIndex: dialog.topIndex(),
      fixed: true
    }).showModal()
  },
  close: function ($d) {
    if ($d) {
      $d.close().remove()
    }
  }
})
module.exports = dialog
