const path = require('path');
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  target: 'web',
  mode: 'development',
  entry: { client: ['webpack-hot-middleware/client?reload=true&noInfo=true', paths.src + '/index.tsx'] },
  output: {
    path: paths.buildClient,
    filename: '[name].js',
    chunkFilename: '[name].js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/client/'
  },
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
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
      title: 'KWARTS',
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
    new Dotenv(),
    new LoadablePlugin({
      outputAsset: false,
      writeToDisk: true,
      filename: paths.build + '/loadable-stats.json'
    })
  ],
  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single', // creates a runtime file to be shared for all generated chunks.
    splitChunks: {
      chunks: 'all', // This indicates which chunks will be selected for optimization.
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          // to convert long vendor generated large name into vendor.js
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimize: false,
    minimizer: []
  }
});
