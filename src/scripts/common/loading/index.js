/**
 * Created by anchao on 2016/6/29.
 */
import * as actionCreator from './actions/actionCreator'
import store from '../../store'

const dialog = {
    show() {
        store.dispatch(actionCreator.showLoading())

        return this
    },

    hide() {
        store.dispatch(actionCreator.hideLoading())

        return this
    }
}

export default dialog
