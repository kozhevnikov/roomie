const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/client'],
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'css-loader' })
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: { extractCSS: true }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({ template: 'src/client/index.html' }),
    new ExtractTextPlugin('styles.css')
  ]
};
