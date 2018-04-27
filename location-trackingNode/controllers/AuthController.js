const bcrypt = require('bcrypt');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const AccountModel = require('../models/Account');
const logger = require('../util/logger');
const r = require('../util/response-helper');

class AuthController {
  static login(payload) {
    return (async () => {
      try {
        const user = await UserModel.query()
          .where('email', payload.email)
          .first();
        if (user && user.is_active && !user.is_deleted) {
          const verified = await bcrypt.compareSync(payload.password, user.password);
          if (verified) {
            const token = jwt.sign(_.pick(user, ['id', 'first_name', 'last_name', 'email']), config.jwt.secret, { expiresIn: '60m' });
            return r.success('Logged in', { token });
          }
        }
        return r.error('Wrong email and password combination', null, 401);
      } catch (e) {
        logger.error(e);
        return r.error();
      }
    })();
  }

  static pinLogin(payload) {
    return (async () => {
      try {
        const account = await AccountModel.query()
          .where('account_pin', payload.pin)
          .first();
        if (account) {
          return r.success('login successful', jwt.sign(account, config.jwt.secret));
        }
        return r.error('Wrong pin', null, 401);
      } catch (e) {
        logger.error(e);
        return r.error();
      }
    })();
  }
}

module.exports = AuthController;
