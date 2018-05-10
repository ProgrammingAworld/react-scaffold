/**
 * 功能：所有动态加载的路由组件
 * 作者：安超
 * 日期： 2018/5/4
 */

import Loadable from 'react-loadable'
import ComLoading from 'common/views/ComponentLoading'

const lazyload = importUrl => Loadable({
    loading: ComLoading,
    loader: () => importUrl
})

export const LoginView = lazyload(import('root/login/container'))
export const MainAppView = lazyload(import('common/views/MainAppView'))
export const TodoMainView = lazyload(import('root/todos/components'))
export const ComponentMainView = lazyload(import('root/others/views/components'))
export const TableMainView = lazyload(import('root/others/views/components/TableExampleView'))
export const CodeEditorView = lazyload(import('root/others/views/components/AceExampleView'))
export const BootstrapView = lazyload(import('root/others/views/components/BootstrapReactView'))
export const ValidateView = lazyload(import('root/others/views/components/ValidatorView'))
export const AntdView = lazyload(import('root/others/views/components/AntdView'))
export const NotFindView = lazyload(import('common/views/Main404View'))
