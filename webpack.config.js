const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const ENTRY_PATH = path.resolve(__dirname, 'client');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(ENTRY_PATH, 'index.js'),
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }, {
        test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        }
      }
    ]
  },
  resolve: {
    alias: {
      root: ENTRY_PATH,
      utilities: path.resolve(ENTRY_PATH, 'utilities'),
    }
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'style.[hash].css', disable: false, allChunks: true
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(OUTPUT_PATH, {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: path.resolve(ENTRY_PATH, 'index.html'),
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ],
  devServer: {
    contentBase: OUTPUT_PATH,
    port: 3000,
    hot: true,
    inline: true,
    publicPath: '/',
    historyApiFallback: true
  }
};