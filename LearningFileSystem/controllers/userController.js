let config = require('../config/config');
let Todos = require('../models/todos');
let usersTest = require('../models/userstest');
let con = config.con;
class UserController { 
    static getUsers() {
          return new Promise((resolve,reject)=>{
            usersTest.query()
            .where('id',1)
            .andWhere('name','some Guy')
            .andWhere('email','some@gmail.com')
            .select('name','email')
            .then((res)=> {
                resolve(res);
              }) 
          })            
    }
    static getTodos() {
       return new Promise((resolve,reject)=> {
        Todos.query()
        .then((res)=> {
          resolve(res);
        })
       })
    }
    static getUserTodos() {
        return new Promise((resolve,reject)=> {
            usersTest.query()
            .eager('todos')
            .modifyEager('todos', builder => {
                builder.orderBy('id', 'asc');
              })
            .then((res)=> {
              resolve(res);
            })
        })
    }
    static getUsersCount() {
        return new Promise((resolve,reject)=> {
            config.con.query('select max(id) as maxnumber from userstest', (err ,result)=> {
               resolve(result) ;
            })
        })
    }
    static saveUsersTest(argUsers) {
        return new Promise((resolve,reject)=> {
           usersTest.query()
           .insert(argUsers)
           .then((res)=> {
               resolve(res);
           })
        })
    }
    static updateUsersTest(argUsers) {
        return new Promise(async(resolve,reject)=> {
            let getID = argUsers.id ;
            argUsers.updated_at = new Date();
            delete argUsers.id ;
            usersTest.query()
            .update(argUsers)
            .where('id','=',parseInt(getID))
            .then(async(res)=> {
                resolve({argUsers});
            })
        })
    }
}
module.exports = UserController;