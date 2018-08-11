var Mongoose = require('mongoose');
const config = require('config');
const connectionString = config.get("dBString");
//load database
Mongoose.connect(connectionString,{ useNewUrlParser: true });
var db = Mongoose.connection;
db.on('error', ()=>{
    console.log('Not Connected to DataBase');
});
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;