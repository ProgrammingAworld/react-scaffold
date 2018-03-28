/**
 * Created by anchao on 2016/6/29.
 */
import { createAction, createActions } from 'common/Util'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    showDialog: createAction(actionTypes.SHOWDIALOG_COMMON),
    hideDialog: createAction(actionTypes.HIDEDIALOG_COMMON)
})

export default actionCreator
