/**
 * Created by Anchao on 2017/9/26.
 */

const gulp = require('gulp')
const del = require('del')
const changed = require('gulp-changed')
// css
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const picbase64 = require('gulp-base64')
const makeUrlVer = require('gulp-make-css-url-version')
// image
const minimage = require('gulp-imagemin')
// js
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream')
const chmod = require('gulp-chmod')

const browserSync = require('browser-sync').create()
const proxy = require('http-proxy-middleware')

const { reload } = browserSync
const config = require('./project.config')

console.log('当前ip=', config.ip)

// 删除
gulp.task('clean', () => del(['dist']).then(() => {
    console.log('删除完成')
}))

// 样式
gulp.task('styles', () => gulp.src(config.sass)
    .pipe(sourcemaps.init())
    .pipe(changed(config.distCss))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(makeUrlVer({ useDate: true }))
    .pipe(gulp.dest(config.distCss))
    .pipe(reload({ stream: true })))

gulp.task('styles_build', () => gulp.src(config.sass)
    .pipe(sourcemaps.init())
    .pipe(changed(config.distCss))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(picbase64({
        baseDir: 'dist',
        extensions: ['png'],
        maxImageSize: 100 * 1024,
        debug: false
    }))
    .pipe(makeUrlVer({ useDate: true }))
    .pipe(gulp.dest(config.distCss)))

// copy bootstrap服务器端字体
gulp.task('copyFont', () => {
    const src = 'src/css/common/fonts/*'
    const dest = `${config.distCss}/fonts/`

    return gulp.src([src])
        .pipe(gulp.dest(dest))
})

// copy pre-commit
gulp.task('copyPrecommit', () => {
    gulp.src(config.precommitSrc)
        .pipe(chmod({
            owner: {
                read: true,
                write: true,
                execute: true
            },
            group: {
                execute: true
            },
            others: {
                execute: true
            }
        }))
        .pipe(gulp.dest(config.precommitDest))
})

// copy plugins
gulp.task('copyPlugins', () => {
    const src = 'src/scripts/plugins/*'
    const dest = `${config.distScript}/plugins/`

    gulp.src(src)
        .pipe(gulp.dest(dest))
})

gulp.task('copy', () => {
    gulp.start(['copyFont', 'copyPrecommit', 'copyPlugins'])
})

// 图片处理
gulp.task('images', () => gulp.src([config.images, '!images/icons/*'])
    .pipe(minimage())
    .pipe(gulp.dest(config.distImg)))

// 代码校验
gulp.task('eslint', () => {
    const myWebpackConfig = Object.assign({}, webpackConfig)
    myWebpackConfig.watch = false
    myWebpackConfig.entry.app.splice(1, 1)

    return gulp.src(config.mainJs)
        .pipe(webpackstream(myWebpackConfig))
        .pipe(gulp.dest(config.dist))
})

gulp.task('webpack', () => {
    const myWebpackConfig = Object.assign({}, webpackConfig)
    myWebpackConfig.entry.app.splice(1, 1)
    myWebpackConfig.module.rules.shift()

    return gulp.src(config.mainJs)
        .pipe(webpackstream(myWebpackConfig))
        .pipe(gulp.dest(config.dist))
        .pipe(reload({ stream: true }))
})

gulp.task('webpack_build', () => {
    const myWebpackConfig = Object.assign({}, webpackConfig)
    const newApp = webpackConfig.entry.app[3]
    delete myWebpackConfig.devServer
    myWebpackConfig.watch = false
    myWebpackConfig.devtool = 'cheap-module-source-map'
    myWebpackConfig.entry.app = newApp

    myWebpackConfig.plugins.shift()
    myWebpackConfig.plugins.shift()
    myWebpackConfig.plugins.shift()
    myWebpackConfig.plugins.shift()
    myWebpackConfig.plugins.unshift(new webpack.optimize.ModuleConcatenationPlugin())
    myWebpackConfig.plugins.unshift(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }))
    myWebpackConfig.plugins.unshift(new webpack.optimize.UglifyJsPlugin(config.uglifyJsConfig))

    return gulp.src(config.mainJs)
        .pipe(webpackstream(myWebpackConfig))
        .pipe(gulp.dest(config.dist))
})

gulp.task('browserSync', () => {
    const { paths, target, proxyPort } = config.proxy
    const filter = function (pathname) {
        return (pathname.match(paths.map(item => (`^${item}`)).join('|')))
    }
    
    const middleware = proxy(filter, {
        target: `${target}:${proxyPort}`,
        changeOrigin: true
    })

    browserSync.init({
        middleware: [middleware],
        server: {
            baseDir: './dist/'
        },
        host: config.ip,
        port: config.port,
        open: false
    })

    // 监听sass变化
    gulp.watch(config.sass, ['styles'])
    // 监听image变化
    gulp.watch(config.image, ['images'])
})

gulp.task('build', ['clean'], () => {
    gulp.start(['copyFont', 'webpack_build', 'styles_build', 'images'])
})

gulp.task('watch', ['clean'], () => {
    gulp.start(['copy', 'browserSync', 'webpack', 'styles', 'images'])
})

gulp.task('default', ['clean'], () => {
    gulp.start(['watch'])
})
