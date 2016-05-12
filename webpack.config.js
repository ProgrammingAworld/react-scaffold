/**
 * Created by anchao on 2016/5/12.
 */
var path = require('path');
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:3000',
        path.resolve(__dirname, 'scripts/app.js')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/scripts/",
        filename: 'app.js',
        sourceMapFilename:'app.map'
    },
    devtool:"source-map",
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
                compact: false
            }
        }]
    }
};