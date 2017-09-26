/**
 * Created by anchao on 2016/5/12.
 */
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3333',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'scripts/app.js')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/scripts/',
    filename: 'app.js',
    sourceMapFilename: 'app.map'
  },
  devtool: 'source-archives',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: ['babel'],
      query: {
        cacheDirectory: true,
        presets: ['env', 'stage-0', 'react'],
        compact: false
      }
    }, {
      test: /.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3333,
    inline: true,
    hot: true
  }
}
