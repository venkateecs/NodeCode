const { Model } = require('objection');

class AccountLocation extends Model {
  static get tableName() {
    return 'account_locations';
  }
}

module.exports = AccountLocation;
