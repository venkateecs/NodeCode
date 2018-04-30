
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usersTest',function(table){
     table.increments('id').primary();
     table.string('name').notNullable();
     table.string('email').notNullable();
     table.timestamp('created_at').defaultTo(knex.fn.now());
     table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('todos',function(table){
    table.increments('id').primary();
     table.timestamp('created_at').defaultTo(knex.fn.now());
     table.timestamp('updated_at').defaultTo(knex.fn.now());
     table.string('title').notNullable();
     table.boolean('completed').notNullable().defaultTo(false);
     //table.integer('user_id');
     table.integer('user_id').unsigned().references('id').inTable('usersTest').onDelete('CASCADE');
     //table.integer('user_id').references('id').inTable('usersTest');
  })
  .createTable('countries',function(table) {
     table.increments('id').primary();
     table.string('name').notNullable();
     table.timestamp('created_at').defaultTo(knex.fn.now());
     table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('states',function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('countryId').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('cities',function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('stateId').notNullable().references('id').inTable('states').onDelete('CASCADE');
    table.integer('countryId').notNullable().references('id').inTable('countries').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos').dropTable('usersTest').dropTable('countries');
};
