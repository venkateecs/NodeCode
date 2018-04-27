const config = require('config');

module.exports = {

  development: {
    client: 'mysql',
    connection: config.database.connection,
    pool: config.database.pool,
    debug: process.env.DEBUG_KNEX,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'mysql',
    connection: config.database.connection,
    pool: config.database.pool,
    debug: process.env.DEBUG_KNEX,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: config.database.connection,
    pool: config.database.pool,
    debug: process.env.DEBUG_KNEX,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
