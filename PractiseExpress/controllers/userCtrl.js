const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require("mongoose");
var users = mongoose.model("users");
class UserCtrl {
  static async saveUsers(payload){
    return new Promise((resolve, reject) => {
      const newUser = new users({
        "username": payload.username,
        "password": payload.password,
      });
     async function getUsersCount() {
        return new Promise((resolve,reject)=> {
          users.find({username:payload.username})
          .countDocuments().then((res)=> {
               resolve(res);
            })
        })
      }
      getUsersCount().then((resultCount)=> {
        if (resultCount === 0) {
          newUser.save(function (error, user) {
            if (error) {
              reject(error);
            }
            resolve(user);
          });
        } else {
          resolve({status:200 , message: `User ${payload.username} Already Exists`})
        }
      })           
    });      
  }
  static getUsers(){
    return new Promise((resolve,reject)=> {
      users.find({}, { _id: 0 }, (err, data) => {
        resolve(data);
      })
    })
  }
  static async login(payload) {
    function usersCheck() {
      return new Promise((resolve,reject)=> {
        users.find({username:payload.username},{_id:0},(err,data)=>{
          if (err) {         
           reject(err);
          } else {
           resolve(data);           
          }        
        })
       })
    }
    let result  = await usersCheck();
    if (result.length === 0) {
       return {status:500,message:'invalid crentials'};
    } else {      
      const token = jwt.sign({username:payload.username},config.get('secret') , { expiresIn: 1440 });       
      return {status:200,message:'User Login Successfully',token:token};
    }
  }
}
module.exports = UserCtrl;
