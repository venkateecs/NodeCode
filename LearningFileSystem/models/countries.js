const Model = require('objection').Model;

class Logs extends Model {
  static get tableName() {
    return 'countries';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        created_at: {type: 'timestamp'},
        updated_at: {type: 'timestamp'},
        name: {type: 'string'}
      }
    };
  }
  static get relationMappings() {
    return {
        states: {
          relation: Model.HasManyRelation,
          modelClass: require('./states'),
          join: {
            from: 'countries.id',
            to: 'states.countryId'
          }
        }
      };
    }  
}

module.exports = Logs;