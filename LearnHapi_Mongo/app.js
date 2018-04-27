const Hapi = require('hapi') ;
const config = require('./config/config');
const path = require('path');
const routes = require('hapi-auto-routes');
const DB=require("./config/database-mongoose").db;
require("./Models/models")();
const server = Hapi.Server({
    host:'localhost',
    port:config.port
});

routes.bind(server).register({
    pattern: path.join(__dirname, '/routes/*.js'),
});

async function start() {
 try {
  await server.start();
  console.log('The Server is Running ' + server.info.uri);
 }
 catch(ex) {
   console.log(`There is an Error`);
 }
}

start() ;