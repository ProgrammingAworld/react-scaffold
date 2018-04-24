/**
 * Created by anchao on 2016/7/26.
 */

import { connect, createSelector } from 'common/Util'
import actionCreator from '../../actions/actionCreator'
import Login from '../components'

const loginSelector = state => state.login
const loginTotalSelector = createSelector(
    [loginSelector],
    loginState => ({
        type: loginState.userType,
        error: loginState.errorMsg
    })
)

export default connect(loginTotalSelector, actionCreator)(Login)
