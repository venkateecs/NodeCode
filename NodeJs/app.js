var Hapi=require("hapi");
const server=new Hapi.Server();
const config=require("./config/config");
const DB=require("./config/database-mongoose").db;
require("./Models/models")();
server.connection({
  host:"localhost",
  port:config.port
});
//const Routes=require("./Routing/routes")(server) ;
server.register({
  register:require("./Routing/routes")
})
server.start((err)=>{
  if(!err){
      console.log(`The Server is Running Successfully on port no ${config.port}`)
  }
  else{
      console.error(`There is an Error in Running the server`);
  }
})