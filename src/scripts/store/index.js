/**
 * Created by anchao on 2015/12/7.
 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import Immutable from 'immutable'
import { routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import dialog from 'common/dialog/reducers'
import loading from 'common/loading/reducers'
import login from '../login/reducers'
import todos from '../todos/reducers'

// state日志
const logger = createLogger({
    stateTransformer: (state) => {
        const newState = {}
        
        for (const i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS()
            } else {
                newState[i] = state[i]
            }
        }
        
        return newState
    }
})

const store = createStore(
    combineReducers({
        dialog,
        loading,
        login,
        todos,
        routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware, logger)
)

export default store
