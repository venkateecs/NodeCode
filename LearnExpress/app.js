let express = require('express');
let config = require('./config/config');
let app = require('./routes/routes');
app.listen(config.port,(err,data)=> {
 console.log('server is running at port ' + config.port);
});

