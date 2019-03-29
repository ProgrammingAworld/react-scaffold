/**
 * Created by anchao on 2016/7/26.
 */
import {
    createSelector,
    connect,
    hot
} from 'framework/Util'
import actionCreator from '@/login/actions/actionCreator'
import App from '../../components/app'

const userInfo = state => state.login
const selector = createSelector([userInfo], login => ({
    username: login.get('username'),
    userType: login.get('userType')
}))

export default connect(selector, actionCreator)(hot(module)(App))
