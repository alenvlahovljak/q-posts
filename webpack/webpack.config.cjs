const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config();

const cleanWebpack = new CleanWebpackPlugin();
const copyWebpack = new CopyWebpackPlugin({ patterns: [{ from: 'public', to: 'public' }] });
const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'q-posts.css'
});
const webpackDefine = new webpack.DefinePlugin({
  'process.env': {
    API_URL: JSON.stringify(dotenv.parsed['API_URL'])
  }
});
const htmlPlugin = new HtmlWebPackPlugin({
  template: './views/index.hbs'
});

const cssLoader = {
  loader: 'css-loader',
  options: {
    import: false,
    modules: {
      localIdentName: '[local]_[hash:base64:3]'
    }
  }
};

const cssEntryPoint = path.resolve(__dirname, '../src/styles/index.css');

module.exports = (config) => ({
  entry: './src/index.tsx',
  cache: true,
  mode: config.mode,
  devtool: config.devtool,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: [cssEntryPoint],
        use: [MiniCssExtractPlugin.loader, cssLoader]
      },
      {
        test: /^((?!\.module).)*\.css$/,
        include: [cssEntryPoint],
        use: [MiniCssExtractPlugin.loader, cssLoader]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ico|jpg|png|gif|webp|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash:8].[ext]',
          publicPath: config.fileLoaderPublicPath
        }
      }
    ].concat(config.rules)
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      public: path.resolve(__dirname, '../public')
    },
    fallback: {
      process: require.resolve('process/browser')
    }
  },
  output: {
    filename: 'q-posts.js',
    path: config.path,
    publicPath: config.fileLoaderPublicPath,
    chunkFilename: `[name].[contenthash].js`
  },
  plugins: [cssExtractPlugin, copyWebpack, cleanWebpack, webpackDefine, htmlPlugin].concat(
    config.plugins || []
  ),
  externals: {},
  devServer: config.devServer || {},
  optimization: config.optimization || {}
});
