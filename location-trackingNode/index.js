process.env.TZ = 'UTC';
const Hapi = require('hapi');
const path = require('path');
const config = require('config');
const routes = require('hapi-auto-routes');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const logger = require('./util/logger');
const r = require('./util/response-helper');
const UserModel = require('./models/User');
require('./util/db');

const server = new Hapi.Server({
  port: config.server.port,
  routes: {
    cors: true,
    validate: {
      failAction: async (request, h, err) => {
        const response = r.error(err.details[0].message, null, 400);
        return h.response(response.result).code(response.code).takeover();
      },
    },
  },
});

routes.bind(server).register({
  pattern: path.join(__dirname, '/routes/*.js'),
});

async function startServer() {
  try {
    await server.register({
      plugin: hapiAuthJwt2,
    });
    server.auth.strategy('jwt', 'jwt', {
      key: config.jwt.secret,
      validate: async (decoded) => {
        try {
          return { isValid: true, credentials: decoded };
        } catch (e) {
          logger.error(e);
          return { isValid: false };
        }
      },
    });
    server.auth.default('jwt');
    await server.start();
    logger.info(`server started ${server.info.uri}`);
  } catch (e) {
    logger.fatal(e);
    throw new Error(e);
  }
}

startServer();
