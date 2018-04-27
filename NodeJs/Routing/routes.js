
const mongoose=require("mongoose");
var foods=mongoose.model("foods");
var citys=mongoose.model("citys");
var joi=require("joi");
var baseRoutes={
   register:function(server,options,next){
    server.route({
        method:"GET",
        path:"/getCities",
        handler:(req,reply)=>{
            citys.find({},{_id:0},(err,data)=>{
            reply(data);
          })    
        }
       });
       
       server.route({
           method:"GET",
           path:"/SearchCity/{name}",
           handler:(req,reply)=>{
               let getName=req.params.name;
               citys.find({name:/Bengaluru/},(err,data)=>{
                   reply(data);
               })
           }
       });
       server.route({
           method:"POST",
           path:"/updateCity/{name}/{id}",
           //path:"/updateCity",
           handler:(req,reply)=>{
               citys.update({id:req.params.id},{$set:{"name":req.params.name}},(err,data)=>{
                 //citys.update({"id":req.payload.id},{$set:{"name":req.payload.name}},(err,data)=>{ 
                  reply(data);
               })
           },
           /*config: {
            validate: {
                params: {
                    name: Joi.string().min(3).max(10)
                }
            }
           }*/
       })
       server.route({
        method:"POST",
        path:"/saveCities",
        handler:(req,reply)=>{
            var namevalue=req.payload.name;
           var getMaxId=[];
            citys.aggregate(
                [
                {
                   $group : {_id : "getMaxID", Maximum : {$max : "$id"}}
                },
                {
                  $project:{"_id":0}
                }
                ],(err,data)=>{
                    getMaxId=data;
                    let NewId=getMaxId[0].Maximum+1;
                    
                    var getCheckCount=citys.find({"name":namevalue},(err,data)=>{
                        if(data==null || data==''){
                            getCheckCount=0;
                            if(getCheckCount==0){
                                
                                const newCity = new citys({
                                "name":req.payload.name,
                                "id":NewId,
                                });
                                newCity.save(function(error, city) {
                                if (error) {
                                console.error(error);
                                }
                                reply(city);
                                });
                                }
                                                                                
                                }
                                else{
                                reply({data:"Already Exits for the city name"});
                                }
                        });                    
                }
                )
        }
       });   
    next()
   }
}
baseRoutes.register.attributes={
    name:"base-routes",
    version:'1.0.0'
}
module.exports=baseRoutes;
/*module.exports=function(server){
    server.route({
        method:"GET",
        path:"/getCities",
        handler:(req,reply)=>{
            citys.find({},{_id:0},(err,data)=>{
            reply(data);
          })    
        }
       });

       server.route({
        method:"POST",
        path:"/saveCities",
        handler:(req,reply)=>{
            var namevalue=req.payload.name;
           var getMaxId=[];
            citys.aggregate(
                [
                {
                   $group : {_id : "getMaxID", Maximum : {$max : "$id"}}
                },
                {
                  $project:{"_id":0}
                }
                ],(err,data)=>{
                    getMaxId=data;
                    let NewId=getMaxId[0].Maximum+1;
                    
                    var getCheckCount=citys.find({"name":namevalue},(err,data)=>{
                        if(data==null || data==''){
                            getCheckCount=0;
                            if(getCheckCount==0){
                                
                                const newCity = new citys({
                                "name":req.payload.name,
                                "id":NewId,
                                });
                                newCity.save(function(error, city) {
                                if (error) {
                                console.error(error);
                                }
                                reply(city);
                                });
                                }
                                                                                
                                }
                                else{
                                reply({data:"Already Exits for the city name"});
                                }
                        });
                    

                    
                }
                )
                    
            

        }
       });
}*/
