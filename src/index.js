/**
 * Created by anchao on 2015/12/7.
 */
import 'babel-polyfill'
import config from 'conf'
import './css/index.scss'
import projectInit from './framework/projectInit'

const { points } = config

projectInit(document.querySelector('#container'), () => {
    console.log('工程初始化完成！！')
    
    // 图片加载失败处理
    document.addEventListener('error', (e) => {
        const elem = e.target
        if (elem.tagName.toLowerCase() === 'img') {
            elem.src = '/static/images/404.png'
            // elem.className = 'img-responsive'
        }
    }, true)
    
    // 发送埋点信息到服务器
    const sendPonterInfo = (pointerDes, viewInfo) => {
        console.log('埋点信息=', pointerDes, '，界面信息=', viewInfo)
    }
    
    // 当前触发的埋点对象
    let curPoint = points[0]
    // 埋点对input输入框处理
    const inputBlurFn = (e) => {
        console.log(e.target.value)
        sendPonterInfo(curPoint.content, e.target.value)
    }
    
    document.addEventListener('click', (e) => {
        const ele = e.target
        const { id } = ele.dataset
        if (id) {
            const obj = points[id]
            curPoint = obj
            
            if (obj.type === 'input') {
                ele.removeEventListener('blur', inputBlurFn, false)
                ele.addEventListener('blur', inputBlurFn, false)
            } else {
                // div
                sendPonterInfo(obj.content, ele.innerText)
            }
        }
    }, false)
})

if (process.env.NODE_ENV === 'production') {
    window.addEventListener('beforeunload', (e) => {
        const msg = '确定要离开吗？'
        e.returnValue = msg
        return msg
    }, false)
}
