const ip = require('ip').address()
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, './')

module.exports = {
    ip: ip.toString(),
    port: 3333,
    dist: 'dist',
    sass: 'src/css/**/*.scss',
    distCss: 'dist/css',
    precommitSrc: 'build/pre-commit',
    precommitDest: '.git/hooks/',
    images: 'src/images/{,*/}*.{gif,jpeg,jpg,png,ico}',
    distImg: 'dist/images',
    distScript: 'dist/scripts',
    mainJs: 'app.js',
    vendor: [
        'antd',
        'axios',
        'classnames',
        'fixed-data-table-2',
        'history',
        'immutable',
        'moment',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'react-router-redux',
        'react-loadable',
        'react-ace',
        'react-bootstrap',
        'react-click-outside',
        'react-hot-loader',
        'redux',
        'redux-logger',
        'redux-thunk',
        'redux-actions',
        'reselect',
        'particles',
        'path-to-regexp',
        'prop-types',
        'echarts',
        'qs'
    ],
    defaultPath: {
        ROOT_PATH,
        APP_PATH: path.resolve(ROOT_PATH, 'src')
    },
    uglifyJsConfig: {
        beautify: false,
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        },
        space_colon: false,
        comments: false
    },
    development: {
        env: { NODE_ENV: JSON.stringify('development') },
        domain: '',
    },
    production: {
        env: { NODE_ENV: JSON.stringify('production') },
        domain: '',
    },
    proxy: {
        target: `http://${ip}`,
        proxyPort: 3003,
        headers: {
            host: '',
        },
        paths: ['/api']
    },
    v: Date.now()
}
