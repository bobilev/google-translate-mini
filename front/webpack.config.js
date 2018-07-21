'use strict'
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
        home: [
            __dirname + '/source/js/app.jsx',
            __dirname + '/source/sass/main.scss'
        ],
      },
  output: {
    publicPath: 'dist/',
    path: __dirname + '/dist',
    filename: 'build.js',
  },
  // devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        }
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          //fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })),
      }
    ]
  },
  performance: { hints: false },//убераем лимит на размер главного файла
  devServer: {
    //stats: 'errors-only',
    host: 'localhost',
    port: 8080
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
