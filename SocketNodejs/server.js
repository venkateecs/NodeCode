var http = require("http");
var Hapi =require("hapi");
//var app = http.createServer(handler);
var fs = require("fs");
var _ = require("lodash");
var users = [];
const server = new Hapi.Server({  
    host: 'localhost',
    port: 5000
  })
  var io = require('socket.io')(server.listener);  
server.route({
    method:'GET',
    path:"/",
    handler: (request, h) => {
        return h.file('./index.html')
      }
})
async function liftOff () {  
    await server.register({
      plugin: require('inert')
    })
  
    await server.start()
    console.log('Server started at: ' + server.info.uri)
  }
  
  liftOff()  
/*function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}
app.listen(5000);*/
io.on('connection', function(socket) {
    console.log("User Connected");
    socket.on("USER-CHAT", function(data) {
        console.log(socket.id);
        console.log(data);
        var user = _.filter(users, { socketid: socket.id })[0];

        io.emit("ADD-TO-CHAT", { username: user.username, message: data });
    });
    socket.on("USER-LOGGEDIN", function(userdata) {
        var isExistingUser = _.filter(users, { username: userdata });
        if (isExistingUser.length > 0) {
            socket.emit("USER-ALREADY-EXISTS", { data: "Please try a different user" });
        } else {
            users.push({ username: userdata, socketid: socket.id });
        }
    });
    socket.on('disconnect', function(data) {
        console.log(socket.id);
    });
});
