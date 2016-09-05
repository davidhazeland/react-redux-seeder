'use strict';

let path = require('path');
let webpack = require('webpack');
let srcPath = path.join(__dirname, '/../src/');

let baseConfig = require('./base');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    tests: [
      path.join(__dirname, '../test/loadtests.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat(
          baseConfig.additionalPaths,
          [
            path.join(__dirname, '/../src'),
            path.join(__dirname, '/../test')
          ]
        )
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx', '.json' ],
    alias: {
      actions: srcPath + 'actions/',
      components: srcPath + 'components/',
      styles: srcPath + 'styles/',
      modules: srcPath + 'modules/',
      services: srcPath + 'services/',
      api: srcPath + 'api/',
      utils: srcPath + 'utils/',
      routes: srcPath + 'routes/',
      config: srcPath + 'config/' + process.env.REACT_WEBPACK_ENV
    }
  },
  plugins: [
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.IgnorePlugin(
      new RegExp('react/lib/ReactContext')
    ),
    new webpack.IgnorePlugin(
      new RegExp('react/lib/ExecutionEnvironment')
    )
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
