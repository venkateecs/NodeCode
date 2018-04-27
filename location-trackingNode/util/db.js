const knex = require('knex');
const knexConfig = require('../knexfile');
const { Model } = require('objection');

const env = process.env.NODE_ENV || 'development';
module.exports = Model.knex(knex(knexConfig[env]));
