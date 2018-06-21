/**
 * Created by anchao on 2015/12/7.
 */
import 'babel-polyfill'
import './css/index.scss'
import projectInit from './framework/projectInit'

projectInit(document.querySelector('#container'))

if (process.env.NODE_ENV === 'production') {
    window.addEventListener('beforeunload', (e) => {
        const msg = '确定要离开吗？'
        e.returnValue = msg
        return msg
    }, false)
}
