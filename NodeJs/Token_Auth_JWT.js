const Hapi = require('hapi');
const Boom = require('boom');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config/config');
const server = new Hapi.Server();
// The connection object takes some
// configuration, including the port
server.connection({ port: 3000 });
const dbUrl = 'mongodb://localhost:27017/locals';
server.register(require('hapi-auth-jwt'), (err) => {
  // We're giving the strategy both a name
  // and scheme of 'jwt'
  server.auth.strategy('jwt', 'jwt', {
    key: secret.key,
    verifyOptions: { algorithms: ['HS256'] }
  });
  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob.sync('api/**/routes/*.js', { 
    root: __dirname 
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});
// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  else{
      console.log("The Server is Running under port no 3000");
  }
  // Once started, connect to Mongo through Mongoose
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) {
      throw err;
    }
    else{
        console.log("The DB is Connected");
    }
  });
});
