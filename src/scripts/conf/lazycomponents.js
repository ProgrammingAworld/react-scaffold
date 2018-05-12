/**
 * 功能：所有动态加载的路由组件
 * 作者：安超
 * 日期： 2018/5/4
 */

import { lazyload } from 'framework'

export const LoginView = lazyload(import('root/login/container'))
export const MainAppView = lazyload(import('root/container/app'))
export const TodoMainView = lazyload(import('root/todos/components'))
export const ComponentMainView = lazyload(import('root/others/components'))
export const TableMainView = lazyload(import('root/others/components/TableExampleView'))
export const CodeEditorView = lazyload(import('root/others/components/AceExampleView'))
export const BootstrapView = lazyload(import('root/others/components/BootstrapReactView'))
export const ValidateView = lazyload(import('root/others/components/ValidatorView'))
export const AntdView = lazyload(import('root/others/components/AntdView'))
export const NotFindView = lazyload(import('root/components/error'))
