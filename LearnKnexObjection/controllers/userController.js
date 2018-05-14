

let config = require('../config/config');
let Todos = require('../models/todos');
let usersTest = require('../models/userstest');
let country = require('../models/countries');
let state = require('../models/states');
let city = require('../models/cities');
let con = config.con;
class UserController {
    static getUsers() {
        return new Promise((resolve, reject) => {
            usersTest.query()
                .where('id', 1)
                .andWhere('name', 'some Guy')
                .andWhere('email', 'some@gmail.com')
                .select('name', 'email')
                .then((res) => {
                    resolve(res);
                })
        })
    }
    static getTodos() {
        return new Promise((resolve, reject) => {
            Todos.query()
                .then((res) => {
                    resolve(res);
                })
        })
    }
    static getUserTodos() {
        return new Promise((resolve, reject) => {
            usersTest.query()
                .eager('todos')
                .modifyEager('todos', builder => {
                    builder.orderBy('id', 'asc');
                })
                .then((res) => {
                    resolve(res);
                })
        })
    }
    static getUsersCount() {
        return new Promise((resolve, reject) => {
            config.con.query('select max(id) as maxnumber from userstest', (err, result) => {
                resolve(result);
            })
        })
    }
    static saveUsersTest(argUsers) {
        return new Promise((resolve, reject) => {
            usersTest.query()
                .insert(argUsers)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    static updateUsersTest(argUsers) {
        return new Promise(async (resolve, reject) => {
            let getID = argUsers.id;
            argUsers.updated_at = new Date();
            delete argUsers.id;
            usersTest.query()
                .update(argUsers)
                .where('id', '=', parseInt(getID))
                .then(async (res) => {
                    resolve({ argUsers });
                })
        })
    }
    static async saveCountry(argCountry) {
        async function count() {
            return new Promise((resolve, reject) => {
                country.query()
                    .count('*')
                    .where('name', '=', argCountry.name)
                    .then((res) => {
                        resolve(res);
                    });
            })
        }
        var checkCount = await count();
        let getCount = parseFloat(checkCount[0]['count(*)']);
        return new Promise((resolve, reject) => {
            if (getCount === 0) {
                country.query()
                    .insert(argCountry)
                    .then((res) => {
                        resolve(res);
                    })
            } else {
                resolve({ status: 200, message: 'The CountryName ' + argCountry.name + ' already exists' });
            }
        });
    }
    static async saveStates(stateName) {
        async function count() {
            return new Promise((resolve, reject) => {
                state.query().count('*').where('name', '=', stateName.name)
                    .then((res) => {
                        resolve(res);
                    })
            })
        }
        let checkCount = await count();
        let getCount = parseFloat(checkCount[0]['count(*)']);
        return new Promise((resolve, reject) => {
            if (getCount > 0) {
                resolve({ status: 200, message: `State ${stateName.name} Already Exists` });
            } else {
                state.query().insert(stateName)
                    .then((res) => {
                        resolve(res);
                    })
            }
        })
    }
    static getCountriesStates() {
        return new Promise((resolve, reject) => {
            country.query()
                .eager('states')
                .modifyEager('states', builder => {
                    builder.orderBy('id', 'asc');
                })
                .then((res) => {
                    resolve(res);
                })
        })
    }
    static async saveCities(cityName) {
        async function count() {
            return new Promise((resolve, reject) => {
                city.query().where('name', '=', cityName.name).count('*')
                    .then((res) => {
                        resolve(res);
                    })
            })
        }
        let checkCount = await count();
        let getCount = parseFloat(checkCount[0]['count(*)']);
        return new Promise((resolve, reject) => {
            if (getCount > 0) {
                resolve({ status: 200, message: `City ${cityName.name} is already exists` });
            } else {
                city.query().insert(cityName)
                    .then((res) => {
                        resolve(res);
                    })
            }
        })
    }
    static async getCities() {
        return new Promise((resolve, reject) => {
            state.query()
                .eager('cities')
                .modifyEager('cities', builder => {
                    builder.orderBy('id', 'asc');
                })
                .then((res) => {
                    resolve(res);
                })
        })
    }
}
module.exports = UserController;