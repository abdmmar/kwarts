const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.tsx'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
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
        test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      // Fonts and SVGs
      {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store']
          },
          noErrorOnMissing: true
        }
      ]
    }),
    new htmlWebpackPlugin({
      title: 'Webpack Vanilla JS',
      favicon: paths.public + '/favicon.png',
      template: paths.public + '/index.html',
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      emitWarning: false
    }),
    new Dotenv()
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public
    }
  }
};
