
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usersTest').del()
    .then(function () {
      // Inserts seed entries
      return knex('usersTest').insert([
        {id: 1, name: 'some Guy',email:'some@gmail.com'},
        {id: 2, name: 'some Girl',email:'somegirl@gmail.com'},
        {id: 3, name: 'some one else',email:'someoneElse@gmail.com'},
      ]);
    });
};
