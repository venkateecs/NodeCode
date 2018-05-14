const Hapi = require('hapi');
const config = require('./config/config');
const routes = require('hapi-auto-routes');
const path = require('path');
const server = Hapi.Server({
    port:config.port,
    host:'localhost',
    "routes": {
      "cors": {
          origin: ["*"],
          headers: ["Accept", "Content-Type"],
          additionalHeaders: ["X-Requested-With"]
      }
  }
  }) ;
  const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
}; 
// bring your own validation function
const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};
  const init = async ()=> {
   await server.start();
   await server.register(require('hapi-auth-jwt2'));
   server.auth.strategy('jwt', 'jwt',
  { key: 'NeverShareYourSecret',          // Never Share your secret key
    validate: validate,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });
  routes.bind(server).register({
    pattern: path.join(__dirname, '/routes/*.js'),
  })
  server.auth.default('jwt');
   console.log('the server is running on ' + server.info.uri);
  }
  init();