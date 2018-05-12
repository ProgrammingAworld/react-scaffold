/**
 * Created by anchao on 2016/7/26.
 */

import { connect } from 'framework/Util'
import actionCreator from '../actions/actionCreator'
import Login from '../components'

export default connect(() => ({}), actionCreator)(Login)
