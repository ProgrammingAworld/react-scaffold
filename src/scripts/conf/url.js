import Loadable from 'react-loadable'
import ComLoading from 'common/views/componentLoading'

const lazyloadDefault = {
    loading: ComLoading
}

const url = {
    root: '/',
    login: {
        path: '/login',
        component: Loadable({
            ...lazyloadDefault,
            loader: () => import('root/login/views/container')
        })
    },
    app: {
        root: {
            path: '/app',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('common/views/MainAppView')
            })
        },
        todos: {
            path: '/app/todos',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/todos/views/components')
            })
        },
        component: {
            path: '/app/component',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components')
            })
        },
        table: {
            path: '/app/component/table',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components/TableExampleView')
            })
        },
        codeeditor: {
            path: '/app/component/codeeditor',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components/AceExampleView')
            })
        },
        bootstrap: {
            path: '/app/component/bootstrap',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components/BootstrapReactView')
            })
        },
        validator: {
            path: '/app/component/validator',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components/ValidatorView')
            })
        },
        antd: {
            path: '/app/component/antd',
            component: Loadable({
                ...lazyloadDefault,
                loader: () => import('root/components/views/components/AntdView')
            })
        }
    },
    notFind: Loadable({
        ...lazyloadDefault,
        loader: () => import('common/views/Main404View')
    })
}

export default url
