var Datastore = require('nedb');  
var users = new Datastore({ filename: 'DB/users.db' , autoload: true });  
const getUsers = {
    method: 'GET',
    path: '/getUsers',
    config: {
        auth: false,
        handler: (async (req) => {
            async function getData() {
                return new Promise((resolve,reject)=> {
                    users.find({},(err,doc)=>{
                        resolve(doc) ;
                        if(err) {
                            reject(err) ;
                        }
                    });
                }) ;
            }
            let result  = await getData() ;
            return result;
        })
    }
}

const saveUser = {
    method:'POST',
    path:'/saveUser',
    handler: async (req)=> {
         async function saveData() {
            return new Promise((resolve,reject)=> {
                users.insert(req.payload, function(err, doc) {  
                    resolve(doc);
                    if(err) {
                        reject(err)
                    }
                 });
            })
        }
        let result  = await saveData();
        return result ;
    }
}

module.exports = [getUsers,saveUser];