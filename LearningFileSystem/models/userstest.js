const Model = require('objection').Model;

class Logs extends Model {
  static get tableName() {
    return 'usersTest';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        email: {type: 'string'},
        created_at: {type: 'timestamp'},
        updated_at: {type: 'timestamp'}
      }
    };
  }
  static get relationMappings() {
    return {
        todos: {
          relation: Model.HasManyRelation,
          modelClass: require('./todos'),
          join: {
            from: 'usersTest.id',
            to: 'todos.user_id'
          }
        },
      };
    }  
}

module.exports = Logs;