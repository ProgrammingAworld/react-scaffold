/**
 * 功能: 右键菜单
 * 作者: anchao
 * 日期: 2019-03-04 16:33
 */

import { React, PureComponent, PropTypes, classNames, noop } from 'framework/Util'
import enhanceWithClickOutside from 'react-click-outside'

class ContextMeun extends PureComponent {
    handleClickOutside(){
        const { updateCxMenuStatus } = this.props
        updateCxMenuStatus(false)
    }
    
    render(){
        const { show } = this.props
        return (
            <ul className={classNames({ hide: !show })}>
                <li>增加</li>
                <li>修改</li>
                <li>删除</li>
            </ul>
        )
    }
}

ContextMeun.defaultProps = {
    show: false,
    updateCxMenuStatus: noop
}

ContextMeun.propTypes = {
    show: PropTypes.bool,
    updateCxMenuStatus: PropTypes.func
}

export default enhanceWithClickOutside(ContextMeun)
