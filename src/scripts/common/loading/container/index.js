/**
 * 功能： loading视图
 * 作者：安超
 * 日期： 2018/3/27
 */

import { React, PropTypes, connect, createSelector } from 'common/Util'
import classNames from 'classnames'

function Loading(props) {
    const {
        show
    } = props
    
    return (
        <div
            className={classNames('loadingdiv', { hide: !show })}
        >
            <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw" /></div>
        </div>
    )
}

/*
  @show: 是否显示loading画面
 */

Loading.propTypes = {
    show: PropTypes.bool
}

Loading.defaultProps = {
    show: false
}

const mapStateToProps = state => state.loading
const selector = createSelector([mapStateToProps], loadingState => ({
    ...loadingState
}))

export default connect(selector)(Loading)
