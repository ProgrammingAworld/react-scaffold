const path = require('path')
const config = require('../project.config')

const {
    ip, port, entry, output, resolve, plugins,
    jsxLoader, imgLoader, fontLoader, cssLoaderUse, mediaLoader, injectionLoader,
    defaultPath: { ROOT_PATH, APP_PATH },
    proxy: { target, proxyPort, paths }
} = config

module.exports = {
    entry,
    output,
    resolve,
    plugins,
    context: ROOT_PATH,
    watch: true,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
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
                use: cssLoaderUse(['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'])
            }
        ]
    },
    devServer: {
        contentBase: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        historyApiFallback: true,
        clientLogLevel: 'none',
        host: ip,
        port,
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
            paths.forEach((apiPath) => {
                obj[apiPath] = origin
            })
            
            return obj
        }())
    }
}
