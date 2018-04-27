
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
     table.integer('user_id').references('id').inTable('usersTest');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos').dropTable('usersTest');
};
