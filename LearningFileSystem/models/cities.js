const Model = require('objection').Model;

class Logs extends Model {
  static get tableName() {
    return 'cities';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        stateId: {type: 'integer'},
        countryId: {type: 'integer'},
        created_at: {type: 'timestamp'},
        updated_at: {type: 'timestamp'}
      }
    };
  }  
}

module.exports = Logs;