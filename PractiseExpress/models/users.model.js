const mongoose=require("mongoose");
var schema={
    username:{type:String},
    password:{type:String},
    auditDate: {type:Date,default:Date.now}
}
var usersSchema=mongoose.Schema(schema,{ versionKey: false });
mongoose.model("users",usersSchema);