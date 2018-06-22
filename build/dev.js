const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const opn = require('opn')
const chalk = require('chalk')
const config = require('./webpack.config')
const projectConf = require('../project.config')

const {
    ip, port,
    defaultPath: { ROOT_PATH },
    proxy: { target, proxyPort, paths }
} = projectConf

const devServerOpt = {
    contentBase: path.join(ROOT_PATH, 'dev'),
    publicPath: '/',
    historyApiFallback: true,
    clientLogLevel: 'none',
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

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, devServerOpt)

server.listen(port, ip, () => {
    const link = `http://${ip}:${port}`
    console.log(chalk.cyan(`服务地址：${link}`))

    opn(link)
        .then(() => {
            console.log(chalk.cyan('请求成功 ...'))
        })
        .catch((err) => {
            console.log(chalk.red(err));
        })
})
