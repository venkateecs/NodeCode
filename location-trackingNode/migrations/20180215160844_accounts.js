exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.string('account_pin').unique();
    table.string('first_name');
    table.string('last_name');
    table.string('constituency');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('accounts'),
]);
