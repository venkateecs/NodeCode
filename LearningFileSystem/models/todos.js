const Model = require('objection').Model;

class Logs extends Model {
  static get tableName() {
    return 'todos';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        created_at: {type: 'timestamp'},
        updated_at: {type: 'timestamp'},
        title: {type: 'string'},
        completed: {type: 'boolean'},
        user_id: {type: 'integer'},
      }
    };
  }  
}

module.exports = Logs;