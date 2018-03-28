/**
 * Created by anchao on 2015/12/7.
 */

import {
    storeCreateByReducer
} from 'common/Util'
import dialog from 'common/dialog/reducers'
import login from '../login/reducers'
import todos from '../todos/reducers'

const store = storeCreateByReducer({
    dialog,
    login,
    todos
})

export default store
