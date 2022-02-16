const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

module.exports = {
  module: {
    rules: [
      // Transpile TypeScript
      {
        test: /\.(ts)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      // Images
      {
        test: /\.(?:ico|png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource'
      },
      // Fonts and SVGs
      {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public
    }
  }
};
