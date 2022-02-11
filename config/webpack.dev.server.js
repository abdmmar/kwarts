const path = require('path');
const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  target: 'node',
  name: 'server',
  mode: 'development',
  entry: path.resolve(__dirname, '../server/index.tsx'),
  output: {
    path: paths.build,
    libraryTarget: 'commonjs2',
    filename: 'server.js',
    chunkFilename: 'chunks/[name].js'
  },
  externals: [webpackNodeExternals()]
});
