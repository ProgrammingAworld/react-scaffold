const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ip = require('ip').address().toString()

const port = 3333
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, './')
const APP_PATH = path.resolve(ROOT_PATH, 'src')

const development = {
    env: { NODE_ENV: JSON.stringify('development') },
    domain: '',
}
const production = {
    env: { NODE_ENV: JSON.stringify('production') },
    domain: '',
}

const uglifyJsConfig = {
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
}

// 开发环境|生产环境
const isProd = process.env.NODE_ENV === 'production'

const entry = (function () {
    let app = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${ip}:${port}`,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ]

    if (isProd) {
        app = './src/index.js'
    }

    return {
        app,
        vendor: [
            'antd',
            'axios',
            'bizcharts',
            'classnames',
            'history',
            'immutable',
            'moment',
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'react-router-redux',
            'react-loadable',
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
            'qs'
        ]
    }
}())
const output = (function () {
    let obj = {
        path: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        filename: 'static/scripts/[name].js',
        chunkFilename: 'static/scripts/[name].js',
        sourceMapFilename: '[file].map',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    }

    if (isProd) {
        obj = {
            path: path.join(ROOT_PATH, 'dist'),
            publicPath: '/',
            filename: 'static/scripts/[name].[chunkhash:10].js',
            chunkFilename: 'static/scripts/[name].[chunkhash:10].js'
        }
    }

    return obj
}())
const jsxLoader = [
    {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
            cache: true,
            formatter: require('eslint-friendly-formatter')
        }
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: ['env', 'stage-0', 'react'],
            plugins: [
                'react-hot-loader/babel',
                'transform-decorators-legacy',
                'syntax-dynamic-import'
            ]
        }
    }
]
const cssLoaderUse = function (loaders) {
    const defaultOpt = { sourceMap: !isProd }
    return loaders.map((loader) => {
        let options = defaultOpt

        if (loader === 'sass-loader') {
            options = isProd ? {
                outputStyle: 'expanded'
            } : {
                outputStyle: 'expanded',
                sourceMapContents: true,
                sourceMap: true
            }
        }

        if (loader === 'sass-resources-loader') {
            options = {
                resources: [
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_compass.scss'),
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_animate.scss'),
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_lemonade.scss'),
                    path.join(APP_PATH, 'css/common/variables.scss'),
                    path.join(APP_PATH, 'css/common/mixins/common.scss')
                ]
            }
        }

        return {
            loader,
            options
        }
    })
}
const imgLoader = (function () {
    return [
        { type: 'png', mimetype: 'image/png' },
        { type: 'jpe', mimetype: 'image/jpe' },
        { type: 'jpeg', mimetype: 'image/jpeg' },
        { type: 'gif', mimetype: 'image/gif' },
        { type: 'svg', mimetype: 'image/svg' }
    ].map(item => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `static/images/[name]${isProd ? '.[hash:10]' : ''}.[ext]`,
            mimetype: item.mimetype
        }
    }))
}())
// 字体配置参考：https://github.com/shakacode/bootstrap-sass-loader
const fontLoader = (function () {
    return [
        { type: 'woff', mimetype: 'application/font-woff' },
        { type: 'woff2', mimetype: 'application/font-woff2' },
        { type: 'otf', mimetype: 'font/opentype' },
        { type: 'ttf', mimetype: 'application/octet-stream' },
        { type: 'eot', mimetype: 'application/vnd.ms-fontobject' },
        { type: 'svg', mimetype: 'image/svg+xml' }
    ].map(item => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `static/fonts/[name]${isProd ? '.[hash:10]' : ''}.[ext]`,
            mimetype: item.mimetype
        }
    }))
}())
const mediaLoader = {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: `static/media/[name]${isProd ? '.[hash:10]' : ''}.[ext]`,
    }
}
const injectionLoader = {
    test: path.join(APP_PATH, 'conf/injection.js'),
    loader: `imports-loader?domain=>
                ${isProd ? JSON.stringify(production.domain) : JSON.stringify(development.domain)}`
}
let plugins = [
    new CleanWebpackPlugin([isProd ? 'dist' : 'dev'], { root: ROOT_PATH }),
    new webpack.DefinePlugin({
        __DEBUG__: !isProd,
        'process.env.NODE_ENV': isProd ? production.env.NODE_ENV : development.env.NODE_ENV
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: [
            'vendor', 'runtime'
        ],
        filename: `static/scripts/[name]${isProd ? '.[chunkhash:10]' : ''}.js`,
        minChunks: Infinity
    }),
    new CopyWebpackPlugin([
        {
            from: 'src/manifest.json',
            to: 'manifest.json'
        }
    ]),
    new StyleLintPlugin({
        files: ['src/**/*.scss'],
        failOnError: false,
        emitErrors: true,
        syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
        template: path.join(APP_PATH, 'index.html'),
        title: '示例工程',
        description: '这是一个示例产品工程',
        filename: 'index.html',
        favicon: 'src/images/favicon.ico',
        inject: 'body',
        chunks: ['runtime', 'vendor', 'app'],
        chunksSortMode: 'manual',
        minify: {
            removeComments: true
        },
        cache: false
    })
]

if (isProd) {
    plugins = plugins.concat([
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            disable: false,
            allChunks: true
        }),
        new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
        new webpack.optimize.UglifyJsPlugin(uglifyJsConfig)
    ])
} else {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ])
}

module.exports = {
    ip,
    port,
    entry,
    output,
    jsxLoader,
    cssLoaderUse,
    imgLoader,
    fontLoader,
    mediaLoader,
    injectionLoader,
    development,
    production,
    uglifyJsConfig,
    plugins,
    defaultPath: {
        ROOT_PATH,
        APP_PATH
    },
    resolve: {
        modules: [
            APP_PATH,
            'node_modules'
        ],
        alias: {
            root: APP_PATH,
            base: path.join(APP_PATH, 'framework/base'),
            framework: path.join(APP_PATH, 'framework'),
            conf: path.join(APP_PATH, 'conf'),
            dialog: path.join(APP_PATH, 'framework/dialog'),
            loading: path.join(APP_PATH, 'framework/loading'),
            plugins: path.join(APP_PATH, 'plugins'),
            particles: path.join(APP_PATH, 'plugins/particles.js'),
        },
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    proxy: {
        target: `http://${ip}`,
        proxyPort: 3003,
        headers: {
            host: '',
        },
        paths: ['/api']
    }
}
