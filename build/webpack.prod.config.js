const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../project.config')

// 字体配置参考：https://github.com/shakacode/bootstrap-sass-loader
const {
    uglifyJsConfig, vendor, resolve,
    defaultPath: { ROOT_PATH, APP_PATH }
} = config

module.exports = {
    context: ROOT_PATH,
    watch: false,
    cache: true,
    entry: {
        app: [
            './src/index.js'
        ],
        vendor
    },
    output: {
        path: path.join(ROOT_PATH, 'dist'),
        publicPath: '/',
        filename: 'static/scripts/[name].[chunkhash:10].js',
        chunkFilename: 'static/scripts/[name].[chunkhash:10].js'
    },
    devtool: false,
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
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
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:10].[ext]',
                    mimetype: 'image/[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:10].[ext]',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:10].[ext]',
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
        new CleanWebpackPlugin(['dist'], { root: ROOT_PATH }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            disable: false,
            allChunks: true
        }),
        new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
        new webpack.optimize.UglifyJsPlugin(uglifyJsConfig),
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor', 'runtime'
            ],
            filename: 'static/scripts/[name].[chunkhash:10].js',
            minChunks: Infinity
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
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
            inject: 'body',
            chunks: ['runtime', 'vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeComments: true
            },
            cache: false
        })
    ]
}
