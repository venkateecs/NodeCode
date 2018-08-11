const UserCtrl = require('../controllers/userCtrl');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = async function(app) {        
    app.post('/saveUsers',async(req,res)=>{
        result = await UserCtrl.saveUsers(req.body);
         res.send({result:result});
    });
    app.get("/getUsers",async(req,res)=> {
        const result =  await UserCtrl.getUsers();
        res.send(result);
    });
    app.post("/login",async(req,res)=> {
       const result = await UserCtrl.login(req.body);
       res.send(result);   
    }) 
}