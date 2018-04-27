const config = require('config');
let db= {
    database: {
        connection: {
          database: 'testramana',
          user: 'root',
          password: '',
        },
      },
      pool: {
        min: 2,
        max: 20,
      }
}
module.exports = {
  development: {
    client: 'mysql',
    connection: db.database.connection,
    pool: db.database.pool,
    debug: process.env.DEBUG_KNEX,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname + '/db/seeds'
      }
  },
  production: {
    client: 'mysql',
    connection: db.database.connection,
    pool: db.database.pool,
    debug: process.env.DEBUG_KNEX,
    migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
          directory: __dirname + '/db/seeds'
        }
  },
};
