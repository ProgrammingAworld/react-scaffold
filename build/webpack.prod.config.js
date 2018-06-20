const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../project.config')

const {
    entry, output, resolve, jsxLoader, imgLoader, cssLoaderUse,
    mediaLoader, fontLoader, injectionLoader, plugins,
    defaultPath: { ROOT_PATH, APP_PATH }
} = config

module.exports = {
    entry,
    output,
    resolve,
    plugins,
    context: ROOT_PATH,
    watch: false,
    cache: true,
    devtool: false,
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaderUse(['css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'])
                })
            }
        ]
    }
}
