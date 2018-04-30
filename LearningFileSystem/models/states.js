const Model = require('objection').Model;

class Logs extends Model {
  static get tableName() {
    return 'states';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        countryId: {type: 'integer'},
        created_at: {type: 'timestamp'},
        updated_at: {type: 'timestamp'}
      }
    };
  }
  static get relationMappings() {
    return {
        cities: {
          relation: Model.HasManyRelation,
          modelClass: require('./cities'),
          join: {
            from: 'states.id',
            to: 'cities.stateId'
          }
        }
      };
    }  
}

module.exports = Logs;