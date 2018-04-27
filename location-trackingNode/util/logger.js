const config = require('config');

const pinoOptions = {};

if (config.environment !== 'production') {
  pinoOptions.prettyPrint = {
    forceColor: true,
  };
}
const pino = require('pino')(pinoOptions);

module.exports = pino;
