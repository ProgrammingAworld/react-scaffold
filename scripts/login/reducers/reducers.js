/**
 * Created by anchao on 2016/7/27.
 */
import {userTypeReducer} from './userTypeReducer';
import {errorReducer} from './errorReducer';
import {usernameReducer} from './usernameReducer';

export const loginReducer = {
    login_type: userTypeReducer,
    login_error:errorReducer,
    login_username:usernameReducer
};