const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../project.config')

// 字体配置参考：https://github.com/shakacode/bootstrap-sass-loader
const {
    ip, port, vendor, resolve,
    defaultPath: { ROOT_PATH, APP_PATH },
    proxy: { target, proxyPort }
} = config

module.exports = {
    context: ROOT_PATH,
    watch: true,
    cache: true,
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${ip}:${port}`,
            'webpack/hot/only-dev-server',
            './src/index.js'
        ],
        vendor
    },
    output: {
        path: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[name].js',
        sourceMapFilename: '[file].map',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve,
    module: {
        rules: [
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
            },
            {
                test: /\.(scss|sass|css)$/,
                include: APP_PATH,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMapContents: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_compass.scss'),
                                path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_animate.scss'),
                                path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_lemonade.scss'),
                                path.join(APP_PATH, 'css/common/variables.scss'),
                                path.join(APP_PATH, 'css/common/mixins/common.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[ext]',
                    mimetype: 'image/[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[ext]',
                }
            },
            {
                test: path.join(APP_PATH, 'conf/injection.js'),
                loader: `imports-loader?domain=>
                ${JSON.stringify(config.development.domain)}`
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dev'], { root: ROOT_PATH }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor', 'runtime'
            ],
            filename: 'scripts/[name].js',
            minChunks: Infinity
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(APP_PATH, 'index.html'),
            title: '示例工程',
            description: '这是一个示例产品工程',
            filename: 'index.html',
            inject: 'body',
            chunks: ['runtime', 'vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeComments: true
            },
            cache: false
        })
    ],
    devServer: {
        contentBase: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        historyApiFallback: true,
        clientLogLevel: 'none',
        host: config.ip,
        port: config.port,
        open: false,
        openPage: '',
        hot: true,
        inline: false,
        compress: true,
        stats: {
            colors: true,
            errors: true,
            warnings: true,
            modules: false,
            chunks: false
        },
        proxy: (function () {
            const obj = {}
            const origin = `${target}:${proxyPort}`
            config.proxy.paths.forEach((apiPath) => {
                obj[apiPath] = origin
            })
            
            return obj
        }())
    }
}
