const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../project.config')

const {
    isProd, entry, output, resolve, plugins, optimization,
    jsxLoader, imgLoader, fontLoader, cssLoaderUse, mediaLoader, injectionLoader,
    defaultPath: { ROOT_PATH, APP_PATH },
    devServer
} = config
const firstloader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
const cssLoaders = [
    firstloader, 'css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'
]

const baseconfig = {
    mode: isProd ? 'production' : 'development',
    entry,
    output,
    resolve,
    plugins,
    context: ROOT_PATH,
    watch: !isProd,
    cache: !isProd,
    devtool: !isProd ? 'cheap-module-eval-source-map' : false,
    module: {
        rules: [
            ...jsxLoader,
            ...imgLoader,
            ...fontLoader,
            mediaLoader,
            injectionLoader,
            {
                test: /\.css$/,
                use: [
                    firstloader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: APP_PATH,
                use: cssLoaderUse(cssLoaders)
            },
            {
                test: /\.less$/,
                include: APP_PATH,
                use: cssLoaderUse([
                    firstloader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ])
            }
        ]
    },
    optimization,
    devServer
}

if (isProd) delete baseconfig.devServer

module.exports = baseconfig
