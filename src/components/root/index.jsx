/**
 * 功能：根组件
 * 作者：安超
 * 日期： 2016/3/26
 */

import { lazyload } from 'framework'
import {
    React,
    Route,
    Redirect,
    Switch,
    hot
} from 'framework/Util'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import config from 'conf'
import Dialog from 'framework/dialog/container'
import Loading from 'framework/loading/container'

const { url } = config
const MainAppView = lazyload(import('@/container/app'))
const NotFindView = lazyload(import('@/components/error'))

const RootRoutesView = function (){
    return (
        <LocaleProvider locale={zhCN}>
            <div className="containerchild">
                <Switch>
                    <Route path={url.root} exact render={() => <Redirect to={url.login.path} />} />
                    <Route path={url.login.path} component={lazyload(import('@/login/container'))} />
                    <Route path={url.app.root.path} component={MainAppView} />
                    <Route component={NotFindView} />
                </Switch>
                <Dialog />
                <Loading />
            </div>
        </LocaleProvider>
    )
}

export default hot(module)(RootRoutesView)
