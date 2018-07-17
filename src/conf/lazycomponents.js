/**
 * 功能：所有动态加载的路由组件
 * 作者：安超
 * 日期： 2018/5/4
 */

import { lazyload } from 'framework'

export const LoginView = lazyload(import('@/login/container'))
export const MainAppView = lazyload(import('@/container/app'))
export const TodoMainView = lazyload(import('@/todos/components/main'))
export const ComponentMainView = lazyload(import('@/others/main'))
export const ValidateView = lazyload(import('@/others/validator'))
export const AntdView = lazyload(import('@/others/antd'))
export const DragView = lazyload(import('@/others/drag'))
export const NotFindView = lazyload(import('@/components/error'))
