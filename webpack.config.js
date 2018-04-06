const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/client'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new VueLoaderPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      favicon: 'src/client/favicon.ico'
    })
  ]
};
