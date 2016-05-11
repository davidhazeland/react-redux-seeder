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
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        include: [
          path.join(__dirname, '/../src')
        ]
      }
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
      reducers: path.join(__dirname, '/../test/modules/reducers'),
      components: srcPath + 'components/',
      sources: srcPath + 'sources/',
      stores: srcPath + 'stores/',
      styles: srcPath + 'styles/',
      modules: srcPath + 'modules/',
      services: srcPath + 'services/',
      api: srcPath + 'api/',
      utils: srcPath + 'utils/',
      helpers: srcPath + 'helpers/',
      routes: srcPath + 'routes/',
      config: srcPath + 'config/' + process.env.REACT_WEBPACK_ENV
    }
  },
  plugins: [
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
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
