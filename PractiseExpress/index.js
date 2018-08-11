const express = require('express');
const app = express();
const config = require('config');
const port = config.get("port") ; 
const Database = require("./config/Database");
const jwt = require('jsonwebtoken');
app.set('superSecret', config.get("secret"));
require('./models/models')();
const myLogger = function (req, res, next) {
    let currentUrl = req.originalUrl ;
    currentUrl = currentUrl.replace("/",'');
    if(currentUrl != 'login') {
        const result = validateToken(req.headers.authorization);     
        if (!result) {
         return res.send({status:401,message:'unauthorized user'});
        }
    }
    next()
  }
  function validateToken (token) {
    let validStatus;
    jwt.verify(token, config.get('secret'), function (err, decoded) {
      if (err) {
        validStatus = false;
      }
      else {
        validStatus = true;
      }
    });
    return validStatus;
  }    
app.use(myLogger)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const router = require('./routes/routes')(app);
app.listen(port,async()=> {
    console.log(`The server is running under port ${port}`)
});

