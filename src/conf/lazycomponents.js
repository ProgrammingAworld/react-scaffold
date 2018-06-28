/**
 * 功能：所有动态加载的路由组件
 * 作者：安超
 * 日期： 2018/5/4
 */

import { lazyload } from 'framework'

export const LoginView = lazyload(import('root/login/container'))
export const MainAppView = lazyload(import('root/container/app'))
export const TodoMainView = lazyload(import('root/todos/components/main'))
export const ComponentMainView = lazyload(import('root/others/main'))
export const ValidateView = lazyload(import('root/others/validator'))
export const AntdView = lazyload(import('root/others/antd'))
export const DragDrop = lazyload(import('root/others/dragdrop'))
export const NotFindView = lazyload(import('root/components/error'))
