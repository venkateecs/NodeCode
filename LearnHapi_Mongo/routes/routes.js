
var mongoose = require("mongoose");
var citys = mongoose.model("citys");
var config = require('../config/config');
let jwt = require('jsonwebtoken');

const getCitys = {
  method: 'GET',
  path: '/citys',
  config: {
    handler: async (request) => {
      let status = validateToken(request.headers.authorization);
      status = true;
      if (status) {
        var query = function () {
          return new Promise((resolve, reject) => {
            citys.find({}, { _id: 0 }, (err, data) => {
              resolve(data);
            })
          })
        }
        var result = await query();
        return result;
      } else {
        return { status: 'fail', desc: 'Authentication failed' };
      }
    }
  }
};
const saveCity = {
  method: 'POST',
  path: '/saveCity',
  config: {
    handler: async (request) => {
      let status = validateToken(request.headers.authorization);
      status = true;
      if (status) {
        var maxValue = function () {
          return new Promise((resolve, reject) => {
            citys.aggregate([
              {
                $group: {
                  _id: '', maxvalue: { $max: "$id" }
                }
              }
            ], (err, data) => {
              resolve(data);
            })
          })
        }
        var insert = function (max) {
          return new Promise((resolve, reject) => {
            const newCity = new citys({
              "name": request.payload.city,
              "id": max[0].maxvalue + 1,
            });
            newCity.save(function (error, city) {
              if (error) {
                reject(error);
              }
              resolve(city);
            });
          })
        }
        var count = function () {
          return new Promise((resolve, reject) => {
            var count = citys.find({ name: request.payload.city }, { _id: 0 }).count();
            resolve(count);
          })
        }
        var result = await maxValue();
        let countcheck = await count();
        if (countcheck === 0) {
          var insert = await insert(result);
          return insert;
        } else {
          return 'City Already Exists';
        }
      } else {
        return { status: 'fail', desc: 'Authentication failed' };
      }
    }
  }
};
const login = {
  method: 'POST',
  path: '/login',
  config: {
    handler: async (req) => {
      token = jwt.sign(req.payload, config.secretKey, { expiresIn: 1440 });
      return { token: token };
    }
  }
}

var validateToken = function (token) {
  let validStatus;
  jwt.verify(token, config.secretKey, function (err, decoded) {
    if (err) {
      validStatus = false;
    }
    else {
      validStatus = true;
    }
  });
  return validStatus;
}


module.exports = [getCitys, login, saveCity]