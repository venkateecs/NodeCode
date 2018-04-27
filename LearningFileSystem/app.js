const Hapi = require('hapi');
const config = require('./config/config');
const routes = require('hapi-auto-routes');
const path = require('path');
//let knex = require('./db/knex');
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const Todos = require('./models/todos');
const knex_config = require('./knexfile');
// Initialize knex connection.
const knex = Knex(knex_config.development);
// Give the connection to objection.js.
Model.knex(knex);

const server = Hapi.Server({
  port:5000,
  host:'localhost'
})
routes.bind(server).register({
  pattern: path.join(__dirname, '/routes/*.js'),
})
const init = async()=>{
  await server.start();
  console.log(`server is running under ${server.info.uri}`);
}
init();