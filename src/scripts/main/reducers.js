/**
 * Created by anchao on 2016/7/26.
 */
import login from '../login/reducers/'
import todos from '../todos/reducers/'

// 每个模块单独一个对象整理
// 登录模块，todos

const reducers = {
    login,
    todos
}

export default reducers
