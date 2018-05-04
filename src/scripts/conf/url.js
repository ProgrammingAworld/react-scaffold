import { lazyload } from 'common/Util'

const url = {
    root: '/',
    login: {
        path: '/login',
        component: lazyload('login/views/container/index.js')
    },
    app: {
        root: {
            path: '/app',
            component: lazyload('common/views/MainAppView.js')
        },
        todos: {
            path: '/app/todos',
            component: lazyload('todos/views/components/index.js')
        },
        component: {
            path: '/app/component',
            component: lazyload('components/views/components/index.js')
        },
        table: {
            path: '/app/component/table',
            component: lazyload('components/views/components/TableExampleView.js')
        },
        codeeditor: {
            path: '/app/component/codeeditor',
            component: lazyload('components/views/components/AceExampleView.js')
        },
        bootstrap: {
            path: '/app/component/bootstrap',
            component: lazyload('components/views/components/BootstrapReactView.js')
        },
        validator: {
            path: '/app/component/validator',
            component: lazyload('components/views/components/ValidatorView.js')
        },
        antd: {
            path: '/app/component/antd',
            component: lazyload('components/views/components/AntdView.js')
        }
    },
    notFind: lazyload('common/views/Main404View.js')
}

export default url
