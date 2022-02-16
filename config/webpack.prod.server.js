const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  target: 'node',
  mode: 'production',
  name: 'server',
  entry: {
    server: './server/index.tsx'
  },
  devtool: false,
  output: {
    path: paths.build,
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  externals: [webpackNodeExternals()]
});
