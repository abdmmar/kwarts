const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  target: 'node',
  mode: 'development',
  name: 'server',
  entry: {
    server: './server/renderer.tsx'
  },
  output: {
    path: paths.buildServer,
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    publicPath: '/'
  },
  externals: [webpackNodeExternals()]
});
