
const { isProd, resolveLocalPath } = require('./env')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './main.js',
  output: {
    filename: isProd ? '[name].[contenthash:8].bundle.js' : '[name].bundle.js',
    path: resolveLocalPath('../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: resolveLocalPath('./loaders/style-loader.js'),
          },
          {
            loader: resolveLocalPath('./loaders/css-loader.js',)
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    // new CleanWebpackPlugin(),
    // require('autoprefixer'),
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash].css" : "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    port: 9000,
    hot: true
  }
};