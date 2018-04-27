const mongoose=require("mongoose");
var schema={
    name:{type:String},
    id:{type:Number}
}

var citySchema=mongoose.Schema(schema,{ versionKey: false });
mongoose.model("citys",citySchema);