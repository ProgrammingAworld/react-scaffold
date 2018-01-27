const ip = require('ip').address()
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, './')

module.exports = {
    ip: ip.toString(),
    port: 3333,
    dist: 'dist',
    sass: 'src/css/**/*.scss',
    distCss: 'dist/css',
    simulate: 'simulates/*.json',
    distsimulate: 'dist/simulates',
    images: 'src/images/{,*/}*.{gif,jpeg,jpg,png,ico}',
    distImg: 'dist/images',
    distScript: 'dist/scripts',
    mainJs: 'app.js',
    vendor: [
        'jquery',
        'react',
        'react-dom',
        'prop-types',
        'immutable',
        'redux',
        'react-redux',
        'history',
        'react-router-dom',
        'react-router-redux',
        'redux-logger',
        'redux-thunk',
        'reselect',
        'particles',
        'echarts'
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
    v: Date.now()
}
