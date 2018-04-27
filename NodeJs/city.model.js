const mongoose=require("mongoose");
var schema={
    name:{type:String},
    tasty:{type:Boolean}
}

var foodSchema=mongoose.Schema(schema);
module.exports= mongoose.model("foods",foodSchema);