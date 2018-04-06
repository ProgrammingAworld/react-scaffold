import { loadable } from 'common/Util'

export const LoginView = loadable(() => import('../../login/views/LoginMainView'))
export const MainAppView = loadable(() => import('./MainAppView'))
export const Main404View = loadable(() => import('./Main404View'))
export const TodoMainView = loadable(() => import('../../todos/views/components/TodoMainView'))
export const ComponentsMainView = loadable(() => import('../../components/views/ComponentsMainView'))
