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
        others: {
            path: '/app/others',
            component: ComponentMainView
        },
        table: {
            path: '/app/others/table',
            component: TableMainView
        },
        codeeditor: {
            path: '/app/others/codeeditor',
            component: CodeEditorView
        },
        bootstrap: {
            path: '/app/others/bootstrap',
            component: BootstrapView
        },
        validator: {
            path: '/app/others/validator',
            component: ValidateView
        },
        antd: {
            path: '/app/others/antd',
            component: AntdView
        }
    },
    notFind: NotFindView
}

export default url
