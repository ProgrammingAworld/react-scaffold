/**
 * Created by anchao on 2016/6/29.
 */
import actionCreator from './actions/actionCreator'
import store from '../../store/index'

const dialog = {
    confirm({
        title = '确认', content, width = 500, ok, cancel = dialog.hide
    }) {
        const onOK = () => {
            if (typeof ok === 'function' && ok()) {
                dialog.hide()
            }
        }
        store.dispatch(actionCreator.showDialog({
            title,
            content,
            width,
            cancel,
            ok: onOK,
            dialogType: 'confirm',
        }))

        return this
    },

    alert({
        title, content, width = 500, infoType = 'info', cancel = dialog.hide, ok = dialog.hide
    }) {
        store.dispatch(actionCreator.showDialog({
            title,
            content,
            width,
            infoType,
            cancel,
            ok,
            dialogType: 'alert',
        }))

        return this
    },

    hide() {
        store.dispatch(actionCreator.hideDialog())

        return this
    }
}

export default dialog
