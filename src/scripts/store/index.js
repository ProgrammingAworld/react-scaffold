/**
 * Created by anchao on 2015/12/7.
 */

import {
    storeCreateByReducer
} from 'common/Util'
import reducers from 'main/reducers'

const store = storeCreateByReducer(reducers)

export default store
