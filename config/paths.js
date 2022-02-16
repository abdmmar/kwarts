const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
  buildClient: path.resolve(__dirname, '../dist/client'),
  buildServer: path.resolve(__dirname, '../dist/server'),
  public: path.resolve(__dirname, '../public')
};
