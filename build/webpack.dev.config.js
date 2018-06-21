const config = require('../project.config')

const {
    entry, output, resolve, plugins,
    jsxLoader, imgLoader, fontLoader, cssLoaderUse, mediaLoader, injectionLoader,
    defaultPath: { ROOT_PATH, APP_PATH }
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
    }
}
