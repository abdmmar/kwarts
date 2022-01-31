const developmentConfig = require('./config/webpack.dev');
const productionConfig = require('./config/webpack.prod');

module.exports = (env, args) => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    default:
      throw new Error('No matching configuration was found for the current mode.');
  }
};
