'use strict';

const path = require('path');

const baseWebpackConfig = require('./webpack.config');

const prodConfig = () =>
  baseWebpackConfig({
    mode: 'production',
    path: path.resolve(__dirname, '../dist'),
    fileLoaderPublicPath: '',
    rules: [],
    plugins: [],
    optimization: {
      minimize: true
    }
  });

module.exports = prodConfig();
