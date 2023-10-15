'use strict';

const path = require('path');
const webpack = require('webpack');

const baseWebpackConfig = require('./webpack.config');

const noEmit = new webpack.NoEmitOnErrorsPlugin();
const webpackDefine = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

const prodConfig = () =>
  baseWebpackConfig({
    mode: 'production',
    path: path.resolve(__dirname, '../dist'),
    fileLoaderPublicPath: '',
    rules: [],
    plugins: [webpackDefine, noEmit],
    optimization: {
      minimize: true
    }
  });

module.exports = prodConfig();
