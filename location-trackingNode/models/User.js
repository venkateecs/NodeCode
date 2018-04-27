const bcrypt = require('bcrypt');
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  $beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  $beforeUpdate() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
}

module.exports = User;
