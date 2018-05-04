/**
 * 功能：所有动态加载的路由组件
 * 作者：安超
 * 日期： 2018/5/4
 */

import Loadable from 'react-loadable'
import ComLoading from 'common/views/ComponentLoading'

const lazyloadDefault = {
    loading: ComLoading
}

export const LoginView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/login/views/container')
})
export const MainAppView = Loadable({
    ...lazyloadDefault,
    loader: () => import('common/views/MainAppView')
})
export const TodoMainView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/todos/views/components')
})
export const ComponentMainView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components')
})
export const TableMainView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components/TableExampleView')
})
export const CodeEditorView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components/AceExampleView')
})
export const BootstrapView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components/BootstrapReactView')
})
export const ValidateView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components/ValidatorView')
})
export const AntdView = Loadable({
    ...lazyloadDefault,
    loader: () => import('root/components/views/components/AntdView')
})
export const NotFindView = Loadable({
    ...lazyloadDefault,
    loader: () => import('common/views/Main404View')
})
