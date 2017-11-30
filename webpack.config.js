const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const config = require('./project.config')

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:'+config.port,
      'webpack/hot/only-dev-server',
      './src/scripts/app.js'
    ],
    vendor: config.vendor
  },
  output: {
    filename: 'scripts/[name].js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['env', 'stage-0', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor', 'manifest'
      ],
      filename: 'scripts/[name].js',
      minChunks: Infinity
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '示例工程',
      description: '这是一个示例产品工程',
      filename: 'index.html',
      inject: 'body',
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeComments: true
      },
      cache: false
    })
  ],
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    historyApiFallback: true,
    clientLogLevel: 'none',
    host: 'localhost',
    port: config.port,
    open: true,
    openPage: '',
    hot: true,
    inline: true,
    compress: true,
    stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: false,
      chunks: false
    }
  }
}
