const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    })
  ]
};
