exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('account_locations', (table) => {
    table.increments('id').primary();
    table.integer('account_id').unsigned().references('id').inTable('accounts');
    table.float('lat');
    table.float('long');
    table.float('acc');
    table.string('timestamp');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('account_locations'),
]);
