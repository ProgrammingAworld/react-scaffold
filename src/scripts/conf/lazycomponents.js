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

export const LoginView = lazyload(import('root/login/views/container'))
export const MainAppView = lazyload(import('common/views/MainAppView'))
export const TodoMainView = lazyload(import('root/todos/views/components'))
export const ComponentMainView = lazyload(import('root/components/views/components'))
export const TableMainView = lazyload(import('root/components/views/components/TableExampleView'))
export const CodeEditorView = lazyload(import('root/components/views/components/AceExampleView'))
export const BootstrapView = lazyload(import('root/components/views/components/BootstrapReactView'))
export const ValidateView = lazyload(import('root/components/views/components/ValidatorView'))
export const AntdView = lazyload(import('root/components/views/components/AntdView'))
export const NotFindView = lazyload(import('common/views/Main404View'))
