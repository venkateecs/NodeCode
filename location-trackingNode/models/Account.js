const { Model } = require('objection');
const path = require('path');

class Account extends Model {
  static get tableName() {
    return 'accounts';
  }
  static get relationMappings() {
    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/AccountLocation'),
        join: {
          from: 'accounts.id',
          to: 'account_locations.account_id',
        },
      },
    };
  }
}

module.exports = Account;
