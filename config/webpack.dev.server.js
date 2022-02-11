const path = require('path');
const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  target: 'node',
  mode: 'development',
  name: 'server',
  entry: {
    server: './server/index.tsx'
  },
  output: {
    path: paths.build,
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  externals: [webpackNodeExternals()]
});
