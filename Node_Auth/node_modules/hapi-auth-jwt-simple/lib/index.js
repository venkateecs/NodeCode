var Boom      = require('boom'); // error handling https://github.com/hapijs/boom
var assert    = require('assert');
var extract   = require('./extract');    // extract token from Auth Header, URL or Coookie
var pkg       = require('../package.json');
var internals = {}; // Declare internals >> see: http://hapijs.com/styleguide

exports.register = function (server, options, next) {
  server.auth.scheme('jwt', internals.implementation);
  next();
};

exports.register.attributes = { // hapi requires attributes for a plugin.
  pkg: pkg                      // See: http://hapijs.com/tutorials/plugins
};

internals.isFunction = function (functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

internals.implementation = function (server, options) {
  assert(options, 'options are required for jwt auth scheme'); // pre-auth checks
  assert(typeof options.validateFunc === 'function', 'options.validateFunc must be a valid function');

  return {
    authenticate: function (request, reply) {
      var token = extract(request, options);

      if (!token) {
        return reply(Boom.unauthorized(null, 'Token'));
      }

      if (!extract.isValid(token)) {
        return reply(Boom.unauthorized('Invalid token format', 'Token'));
      }

      options.validateFunc(token, request, function (err, valid, credentials) { // bring your own checks
        if (err) {
          return reply(Boom.wrap(err));
        }
        else if (!valid) {
          return reply(Boom.unauthorized('Invalid credentials', 'Token'), null, { credentials: credentials });
        }
        else {
          return reply.continue({ credentials: credentials });
        }
      });
    }
  };
};
