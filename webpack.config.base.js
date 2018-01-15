/**
 * Base webpack config used across other specific configs
 */

const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const { dependencies: externals } = require('./app/package.json')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        // loaders: ['react-hot-loader/webpack', 'ts-loader'],
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader?useCache'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [new CheckerPlugin()],

  externals: Object.keys(externals || {})
}
