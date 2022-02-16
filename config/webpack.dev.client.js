const path = require('path');
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  name: 'client',
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://localhost:5002/__webpack_hmr&timeout=2000`,
      paths.src + '/index.tsx'
    ]
  },
  output: {
    path: paths.buildClient,
    filename: '[name].js',
    publicPath: '/',
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js'
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
      filename: paths.buildClient + '/loadable-stats.json'
    })
  ],
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
