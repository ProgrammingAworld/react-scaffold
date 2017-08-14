/**
 * Created by Anchao on 2015/10/4.
 */
'use strict'

var gulp = require('gulp')
var del = require('del')
var changed = require('gulp-changed')
// html
var pug = require('gulp-pug')
var replace = require('gulp-replace')
// css
var compass = require('gulp-compass')
var picbase64 = require('gulp-base64')
var makeUrlVer = require('gulp-make-css-url-version')
// image
var minimage = require('gulp-imagemin')
// js
var webpack = require('webpack')
var webpackstream = require('webpack-stream')

var browserSync = require('browser-sync').create()
var reload = browserSync.reload

var config = {
  'dist': 'dist',
  'html': 'dist/*.html',
  'pug': 'html/*.pug',
  'sass': 'css/**/*.scss',
  'distCss': 'dist/css',
  'simulate': 'simulates/*.json',
  'distsimulate': 'dist/simulates',
  'distScript': 'dist/scripts',
  'images': 'images/{,*/}*.{gif,jpeg,jpg,png,ico}',
  'distImg': 'dist/images',
  'mainJs': 'app.js',
  'v': Date.now()
}

// 删除
gulp.task('clean', function () {
  return del(['dist']).then(function () {
    console.log('删除完成')
  })
})

// html_pug
gulp.task('pug', function () {
  gulp.src(config.pug)
        .pipe(changed(config.pug))
        .pipe(pug({
          doctype: 'html',
          pretty: false
        }))
        .pipe(replace(/images?\/(\w+?)(.png)/g, 'images/$1$2?v=' + config.v))
        .pipe(replace('css/main.css', 'css/main.css?v=' + config.v))
        .pipe(replace('scripts/app.js', 'scripts/app.js?v=' + config.v))
        .pipe(gulp.dest(config.dist))
})

// 样式
gulp.task('styles', function () {
  return gulp.src(config.sass)
        .pipe(changed(config.distCss))
        .pipe(compass({
          config_file: 'config.rb',
          css: config.distCss,
          sass: 'css'
        }))
        .pipe(makeUrlVer({useDate: true}))
        .pipe(gulp.dest(config.distCss))
        .pipe(reload({stream: true}))
})

gulp.task('styles_build', function () {
  return gulp.src(config.sass)
        .pipe(changed(config.distCss))
        .pipe(compass({
          config_file: 'config_build.rb',
          css: config.distCss,
          sass: 'css'
        }))
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
  var src = 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*'
  var src2 = 'css/common/fonts/*'
  var dest = config.distCss + '/fonts/'

  return gulp.src([src, src2])
        .pipe(gulp.dest(dest))
})

// copy simulates
gulp.task('copySimulate', function () {
  gulp.src(config.simulate)
        .pipe(gulp.dest(config.distsimulate))
})

// copy plugins
gulp.task('copyPlugins', function () {
  var src = 'scripts/plugins/*'
  var dest = config.distScript + '/plugins/'

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
  return gulp.src(config.mainJs)
        .pipe(webpackstream({
          watch: true,
          entry: {
            app: './scripts/app.js'
          },
          output: {
            filename: '[name].js',
            sourceMapFilename: '[file].map'
          },
          devtool: 'source-map',
          resolve: {
            extensions: ['', '.js', '.jsx']
          },
          module: {
            loaders: [
              {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                  cacheDirectory: true,
                  presets: ['env', 'stage-0', 'react']
                }
              }
            ]
          }
        }))
        .pipe(gulp.dest(config.distScript))
        .pipe(reload({stream: true}))
})

gulp.task('webpack_build', function () {
  return gulp.src(config.mainJs)
        .pipe(webpackstream({
          watch: false,
          entry: {
            app: './scripts/app.js'
          },
          output: {
            filename: '[name].js'
          },
          resolve: {
            extensions: ['', '.js', '.jsx']
          },
          module: {
            loaders: [
              {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                  cacheDirectory: true,
                  presets: ['env', 'stage-0', 'react']
                }
              }
            ]
          },
          plugins: [
            new webpack.optimize.UglifyJsPlugin({minimize: true}),
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.OccurenceOrderPlugin()
          ]
        }))
        .pipe(gulp.dest(config.distScript))
})

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3333,
    open: false
  })

    // 监听模板html变化
  gulp.watch(config.pug, ['pug'])
    // 监听sass变化
  gulp.watch(config.sass, ['styles'])
    // 监听image变化
  gulp.watch(config.image, ['images'])
})

gulp.task('build', ['clean'], function () {
  gulp.start(['webpack_build', 'pug', 'styles_build', 'images', 'copy'])
})

gulp.task('watch', ['clean'], function () {
  gulp.start(['browserSync', 'webpack', 'pug', 'styles', 'images', 'copy'])
})

gulp.task('default', ['clean'], function () {
  gulp.start(['watch'])
})
