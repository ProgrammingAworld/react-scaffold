const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const config = require('../project.config')

const {
    ip, port,
    defaultPath: { ROOT_PATH },
    proxy: { target, proxyPort, paths }
} = config

module.exports = webpackMerge(webpackConfig, {
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
})
