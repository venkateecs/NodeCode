const joi = require('joi');
const _ = require('lodash');
const AuthController = require('../controllers/AuthController');

const login = {
  path: '/auth/login',
  method: 'POST',
  options: {
    auth: false,
    validate: {
      payload: {
        email: joi.string().lowercase().email().required(),
        password: joi.string().required(),
      },
    },
    handler: (request, h) => AuthController
      .login(request.payload)
      .then(data => h.response(data.result).code(data.code)),
  },
};

const pinLogin = {
  path: '/auth/pin-login',
  method: 'POST',
  options: {
    auth: false,
    validate: {
      payload: {
        pin: joi.string().required(),
      },
    },
    handler: (request, h) => AuthController.pinLogin(request.payload)
      .then(data => h.response(data.reuslt).code(data.code)),
  },
};

module.exports = [login, pinLogin];
