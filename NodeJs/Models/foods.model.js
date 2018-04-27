const mongoose=require("mongoose");
var schema={
    name:{type:String},
    tasty:{type:Boolean}
}

var foodSchema=mongoose.Schema(schema);
mongoose.model("foods",foodSchema);