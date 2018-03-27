/**
 * Created by anchao on 2015/12/7.
 */

import {
    storeCreateByReducer
} from 'common/Util'
import login from '../login/reducers'
import todos from '../todos/reducers'

const store = storeCreateByReducer({
    login,
    todos
})

export default store
