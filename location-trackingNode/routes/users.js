const joi = require('joi');
const _ = require('lodash');
const UserController = require('../controllers/UserController');

const getLocations = {
  path: '/getLocations',
  method: 'POST',
  options: {
    validate: {
      payload: {
        pinId: joi.string().required()
      },
    },
    handler: (request, h) => { 
        return UserController
        .getLocations(request.payload)
        .then(data => h.response(data.result).code(data.code))
    }
  },
};
const addLocation = {
    path: '/addLocation',
    method: 'POST',
    options: {
        validate: {
            payload: {
                location: joi.array().items({
                    account_id: joi.string().required(),
                    lat: joi.number().required(),
                    long: joi.number().required(),
                    acc: joi.number().required()
                })
            }
        },
        handler: (req, h) => {
            return UserController.addLocation(req.payload)
            .then(data => h.response(data.result).code(data.code))
        }
    }
}
const addAccount = {
    path: '/addAccount',
    method: 'POST',
    options: {
        validate: {
            payload: {
                first_name: joi.string().required(),
                last_name: joi.string().required(),
                constituency: joi.string().required()
            }
        },
        handler: (req, h) => {
            req.payload.account_pin =  Math.floor(100000 + Math.random() * 900000);

            return UserController.addAccount(req.payload)
            .then(data => h.response(data.result).code(data.code))
        }
    }
}
const getAccount = {
    path: '/getAccount',
    method: 'POST',
    options: {
        validate: {
            payload:{
                pinId: joi.number().required()
            }
        },
        handler: (req, h) => {
        return UserController
        .getAccount(req.payload)
        .then(data => h.response(data.result).code(data.code))
        }
    }
}

const getAccounts = {
    path: '/getAccounts',
    method: 'GET',
    options: { 
        auth: false,
        handler: (req, h) => {
        return UserController
        .getAllAccounts()
        .then(data => h.response(data.result).code(data.code))
        }
    }
}

const addUser = {
    path: '/addUser',
    method: 'POST',
    options: {
        auth:false,
        validate: {
            payload:{
                first_name: joi.string().required(),
                last_name: joi.string(),
                email: joi.string().email().required(),
                password: joi.string().required()
            }
        },
        handler: (req, h) => {
            
        return UserController
        .addUser(req.payload)
        .then(data => h.response(data.result).code(data.code))
        }
    }
}

module.exports = [getLocations, addLocation, addAccount, getAccount, addUser, getAccounts];
