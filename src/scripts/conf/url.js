import loadable from 'loadable-components'

const url = {
    root: {
        path: '/'
    },
    login: {
        path: '/login',
        component: loadable(() => import('root/login/views/LoginMainView'))
    },
    app: {
        root: {
            path: '/app',
            component: loadable(() => import('common/views/MainAppView'))
        },
        todos: {
            path: '/app/todos',
            component: loadable(() => import('root/todos/views/components/TodoMainView'))
        },
        component: {
            path: '/app/component',
            component: loadable(() => import('root/components/views/ComponentsMainView'))
        },
        table: {
            path: '/app/component/table',
            component: loadable(() => import('root/components/views/components/TableExampleView'))
        },
        codeeditor: {
            path: '/app/component/codeeditor',
            component: loadable(() => import('root/components/views/components/AceExampleView'))
        },
        bootstrap: {
            path: '/app/component/bootstrap',
            component: loadable(() => import('root/components/views/components/BootstrapReactView'))
        },
        validator: {
            path: '/app/component/validator',
            component: loadable(() => import('root/components/views/components/ValidatorView'))
        },
        antd: {
            path: '/app/component/antd',
            component: loadable(() => import('root/components/views/components/AntdView'))
        },
        test: {
            path: '/app/component/test',
            component: loadable(() => import('root/components/views/components/TestView'))
        },
        person: {
            path: '/app/component/test/per/:person?',
            component: loadable(() => import('root/components/views/components/PersonView'))
        },
        animal: {
            path: '/app/component/test/ani/:animal',
            component: loadable(() => import('root/components/views/components/AnimalView'))
        }
    },
    notFind: {
        component: loadable(() => import('common/views/Main404View'))
    }
}

export default url
