/**
 * Created by anchao on 2016/7/27.
 */
import userTypeReducer from './userTypeReducer';
import errorReducer from './errorReducer';

const loginReducer = {
    login_type: userTypeReducer,
    login_error: errorReducer
}

export default loginReducer
