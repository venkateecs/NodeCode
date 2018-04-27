
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, title: 'title1',user_id:1},
        {id: 2, title: 'title2',user_id:2},
        {id: 3, title: 'title3',user_id:3},
      ]);
    });
};
