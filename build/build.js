const webpack = require('webpack')
const chalk = require('chalk')
const config = require('./webpack.config')

webpack(config, (err, stats) => {
    if (err) throw err

    process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    })}\n\n`);

    if (stats.hasErrors()) {
        console.log(chalk.red('  打包出错.\n'));
        process.exit(1);
    }

    console.log(chalk.cyan('打包完成~~'))
})

