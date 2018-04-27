let Hapi =require('hapi');
let jwt = require('jsonwebtoken');
let secret = require("./config/config");
let server = new Hapi.Server();
server.connection({port:3000});
let token 
  server.route({
      method:"POST",
      path:"/login",
      handler:(req,reply)=>{
        token = jwt.sign(req.payload, secret.secretKey, { expiresIn: 1440 });
         reply({'Token': token})
        .type('application/json')   
        .header('Token', token)
      }
  })

  server.route({
      method:'GET',
      path:"/getdetails",
      config: { auth: false },
      handler:(req,reply)=>{
          let token = req.headers.token ;
          let getResult = validateToken(token);
          if(getResult) {
             reply(jwt.decode(token));
          } else {
            reply({status:404,message : 'Token is not Valid'});
          }
          
      }
  })
  
var validateToken = function(token) {
    let validStatus  ;  
    jwt.verify(token, secret.secretKey, function(err, decoded) {
        if(err) {
            validStatus = false ;
        }
        else {
            validStatus = true ;
        }
    });
    return validStatus ;
}
server.start(()=>{
    console.log('Server is running 3000');
})
