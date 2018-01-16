const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('./project.config')

module.exports = {
  watch: true,
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://' + config.ip + ':' + config.port,
      'webpack/hot/only-dev-server',
      './src/scripts/app.js'
    ],
    vendor: config.vendor
  },
  output: {
    filename: 'scripts/[name].js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modules: [
      config.defaultPath.APP_PATH,
      'node_modules'
    ],
    alias: {
      particles: path.resolve(__dirname, './src/scripts/plugins/particles.js'),
      echarts: path.resolve(__dirname, './src/scripts/plugins/echarts.min.js')
    },
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
        'vendor', 'runtime'
      ],
      filename: 'scripts/[name].js',
      minChunks: Infinity
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '示例工程',
      description: '这是一个示例产品工程',
      filename: 'index.html',
      inject: 'body',
      chunks: ['runtime', 'vendor', 'app'],
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
    host: config.ip,
    port: config.port,
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
    }
  }
}
