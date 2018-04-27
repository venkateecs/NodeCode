var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testramana"
  });
let config = {
    con:con,
    DB: () => {
          con.connect(function(err) {
            if (err) {
              console.error(`Not Connected`);
            } else {
                console.log("Connected!");
            }
          });
    }
} ;
module.exports = config ;