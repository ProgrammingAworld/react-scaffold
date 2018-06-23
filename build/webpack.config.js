const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../project.config')

const {
    isProd, entry, output, resolve, plugins,
    jsxLoader, imgLoader, fontLoader, cssLoaderUse, mediaLoader, injectionLoader,
    defaultPath: { ROOT_PATH, APP_PATH },
    devServer
} = config

const cssLoaders = [
    'style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'
]

const baseconfig = {
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
                test: /\.(scss|sass|css)$/,
                include: APP_PATH,
                use: !isProd ? cssLoaderUse(cssLoaders) : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaderUse(cssLoaders)
                })
            }
        ]
    },
    devServer
}

if (isProd) delete baseconfig.devServer

module.exports = baseconfig
