'use strict';

const webpack = require('webpack');
const path = require('path');

const baseWebpackConfig = require('./webpack.config');

const webpackDefine = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

const PORT = 3000;

const devConfig = () =>
  baseWebpackConfig({
    mode: 'development',
    stats: 'errors-only',
    devtool: 'eval-source-map',
    path: path.resolve(__dirname, '../dist'),
    fileLoaderPublicPath: '/',
    rules: [],
    plugins: [webpackDefine],
    devServer: {
      allowedHosts: 'all',
      historyApiFallback: true,
      port: PORT,
      open: false,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      static: {
        directory: path.resolve(__dirname, '../dist')
      },
      devMiddleware: {
        stats: 'errors-only'
      }
    }
  });

module.exports = devConfig();
