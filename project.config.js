module.exports = {
  'port': 3333,
  'dist': 'dist',
  'sass': 'src/css/**/*.scss',
  'distCss': 'dist/css',
  'simulate': 'simulates/*.json',
  'distsimulate': 'dist/simulates',
  'images': 'src/images/{,*/}*.{gif,jpeg,jpg,png,ico}',
  'distImg': 'dist/images',
  'distScript': 'dist/scripts',
  'mainJs': 'app.js',
  'vendor': [
    'jquery',
    'react',
    'react-dom',
    'prop-types',
    'immutable',
    'redux',
    'react-redux',
    'history',
    'react-router-dom',
    'react-router-redux',
    'redux-logger',
    'redux-thunk',
    'reselect'
  ],
  'v': Date.now()
}