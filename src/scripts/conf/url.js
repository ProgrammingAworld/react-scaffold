import {
    LoginView, MainAppView, TodoMainView, ComponentMainView, TableMainView,
    CodeEditorView, BootstrapView, ValidateView, AntdView, NotFindView 
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
        component: {
            path: '/app/component',
            component: ComponentMainView
        },
        table: {
            path: '/app/component/table',
            component: TableMainView
        },
        codeeditor: {
            path: '/app/component/codeeditor',
            component: CodeEditorView
        },
        bootstrap: {
            path: '/app/component/bootstrap',
            component: BootstrapView
        },
        validator: {
            path: '/app/component/validator',
            component: ValidateView
        },
        antd: {
            path: '/app/component/antd',
            component: AntdView
        }
    },
    notFind: NotFindView
}

export default url
