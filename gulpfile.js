/**
 * Created by Anchao on 2017/9/26.
 */
'use strict'

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

const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const config = require('./project.config')

console.log('当前ip=', config.ip)

// 删除
gulp.task('clean', function () {
  return del(['dist']).then(function () {
    console.log('删除完成')
  })
})

// 样式
gulp.task('styles', function () {
  return gulp.src(config.sass)
        .pipe(sourcemaps.init())
        .pipe(changed(config.distCss))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(makeUrlVer({useDate: true}))
        .pipe(gulp.dest(config.distCss))
        .pipe(reload({stream: true}))
})

gulp.task('styles_build', function () {
  return gulp.src(config.sass)
        .pipe(sourcemaps.init())
        .pipe(changed(config.distCss))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(picbase64({
          baseDir: 'dist',
          extensions: ['png'],
          maxImageSize: 100 * 1024,
          debug: false
        }))
        .pipe(makeUrlVer({useDate: true}))
        .pipe(gulp.dest(config.distCss))
})

// copy bootstrap服务器端字体
gulp.task('copyFont', function () {
  const src = 'src/css/common/fonts/*'
  const dest = config.distCss + '/fonts/'

  return gulp.src([src])
        .pipe(gulp.dest(dest))
})

// copy simulates
gulp.task('copySimulate', function () {
  gulp.src(config.simulate)
        .pipe(gulp.dest(config.distsimulate))
})

// copy plugins
gulp.task('copyPlugins', function () {
  const src = 'src/scripts/plugins/*'
  const dest = config.distScript + '/plugins/'

  gulp.src(src)
        .pipe(gulp.dest(dest))
})

gulp.task('copy', function () {
  gulp.start(['copyFont', 'copySimulate', 'copyPlugins'])
})

// image
gulp.task('images', function () {
  return gulp.src([config.images, '!images/icons/*'])
        .pipe(minimage())
        .pipe(gulp.dest(config.distImg))
})

gulp.task('webpack', function () {
  let myWebpackConfig = Object.assign({}, webpackConfig)
  myWebpackConfig.entry.app.splice(1, 1)

  return gulp.src(config.mainJs)
        .pipe(webpackstream(myWebpackConfig))
        .pipe(gulp.dest(config.dist))
        .pipe(reload({stream: true}))
})

gulp.task('webpack_build', function () {
  let myWebpackConfig = Object.assign({}, webpackConfig)
  delete myWebpackConfig.devServer
  myWebpackConfig.watch = false
  myWebpackConfig.devtool = 'cheap-module-source-map'
  myWebpackConfig.entry.app = webpackConfig.entry.app[3]

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

gulp.task('browserSync', function () {
  browserSync.init({
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

gulp.task('build', ['clean'], function () {
  gulp.start(['copy', 'webpack_build', 'styles_build', 'images'])
})

gulp.task('watch', ['clean'], function () {
  gulp.start(['copy', 'browserSync', 'webpack', 'styles', 'images'])
})

gulp.task('default', ['clean'], function () {
  gulp.start(['watch'])
})
