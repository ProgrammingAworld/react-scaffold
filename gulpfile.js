/**
 * Created by Anchao on 2017/9/26.
 */
'use strict'

const gulp = require('gulp')
const del = require('del')
const changed = require('gulp-changed')
// css
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');
const picbase64 = require('gulp-base64')
const makeUrlVer = require('gulp-make-css-url-version')
// image
const minimage = require('gulp-imagemin')
// js
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream')
const WebpackDevServer = require('webpack-dev-server')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const config = require('./project.config')

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
  return gulp.src(config.mainJs)
        .pipe(webpackstream({
          watch: true,
          entry: {
            app: [
              'react-hot-loader/patch',
              'webpack-dev-server/client?http://localhost:'+config.port,
              'webpack/hot/only-dev-server',
              './src/scripts/app.js'
            ],
            vendor: config.vendor
          },
          output: {
            filename: 'scripts/[name].js',
            sourceMapFilename: '[file].map'
          },
          devtool: 'cheap-module-source-map',
          resolve: {
            extensions: ['.js', '.jsx']
          },
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  presets: ['env', 'stage-0', 'react']
                }
              }
            ]
          },
          plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new webpack.optimize.CommonsChunkPlugin({
              names: [
                'vendor', 'manifest'
              ],
              filename: 'scripts/[name].js',
              minChunks: Infinity
            }),
            new ChunkManifestPlugin({
              filename: 'chunk-manifest.json',
              manifestVariable: 'webpackManifest'
            }),
            new HtmlWebpackPlugin({
              template: './src/index.html',
              title: '示例工程',
              description: '这是一个示例产品工程',
              filename: 'index.html',
              inject: 'body',
              chunks: ['manifest', 'vendor', 'app'],
              chunksSortMode: 'manual',
              minify: {
                removeComments: true
              },
              cache: false
            })
          ]
        }))
        .pipe(gulp.dest(config.dist))
        // .pipe(reload({stream: true}))
})

gulp.task('webpack_build', function () {
  return gulp.src(config.mainJs)
        .pipe(webpackstream({
          watch: false,
          entry: {
            app: './src/scripts/app.js',
            vendor: config.vendor
          },
          output: {
            filename: 'scripts/[name].js'
          },
          resolve: {
            extensions: ['.js', '.jsx']
          },
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
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
            new HtmlWebpackPlugin({
              template: './src/index.html',
              title: '示例工程',
              description: '这是一个示例产品工程',
              filename: 'index.html',
              inject: 'body',
              chunks: ['vendor', 'app'],
              chunksSortMode: 'manual',
              minify: {
                removeComments: true
              },
              cache: false
            })
          ]
        }))
        .pipe(gulp.dest(config.dist))
})

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    port: config.port,
    open: false
  })

    // 监听sass变化
  gulp.watch(config.sass, ['styles'])
    // 监听image变化
  gulp.watch(config.image, ['images'])
})

gulp.task('webpack-dev-server', function () {
  let myConfig = Object.create(require('./webpack.config.js'));
  myConfig.devtool = 'eval'
  const compiler = webpack(myConfig)
  new WebpackDevServer(compiler, {
    contentBase: 'dist',
    publicPath: '/',
    historyApiFallback: true,
    clientLogLevel: 'none',
    host: 'localhost',
    port: config.port,
    open: true,
    openPage: '',
    hot: true,
    inline: true,
    compress: true,
    stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: false,
      chunks: false
    }
  }).listen(config.port, 'localhost', function (err) {
    if (err) {
      console.log('webpack-dev-server', err);
    }
  });
});

gulp.task('build', ['clean'], function () {
  gulp.start(['copy', 'webpack_build', 'styles_build', 'images'])
})

gulp.task('watch', ['clean'], function () {
  gulp.start(['copy', 'webpack-dev-server', 'webpack', 'styles', 'images'])
})

gulp.task('default', ['clean'], function () {
  gulp.start(['watch'])
})
