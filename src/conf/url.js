import {
    LoginView, MainAppView, TodoMainView, ComponentMainView,
    ValidateView, AntdView, DragView, NotFindView
} from './lazycomponents'

const url = {
    root: '/',
    login: {
        path: '/login',
        component: LoginView
    },
    app: {
        root: {
            path: '/app',
            component: MainAppView
        },
        todos: {
            path: '/app/todos',
            component: TodoMainView
        },
        others: {
            path: '/app/others',
            component: ComponentMainView
        },
        validator: {
            path: '/app/others/validator',
            component: ValidateView
        },
        antd: {
            path: '/app/others/antd',
            component: AntdView
        },
        drag: {
            path: '/app/others/drag',
            component: DragView
        },
    },
    notFind: NotFindView
}

export default url
