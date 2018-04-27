const Hapi = require('hapi');
const joi = require('joi');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var base64Img = require('base64-img');
var fs = require("fs");
const server = new Hapi.Server();

server.connection({
    host: "localhost",
    port: 9003
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello/{user}/{page}',
    handler: (request, reply) => {
        return 'Hello ' + request.params.user + request.params.page;
    },
    config: {
        validate: {
            params: {
                user: joi.string().min(3).max(10),
                page: joi.number().min(1)
            }
        }
    }
});
server.route({
    method: 'POST',
    path: '/uploadImage',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
        },
        handler: function (request, reply) {
            var data = request.payload;
            if (data.file) {
                var name = data.file.hapi.filename;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);
                file.on('error', function (err) {
                    console.error(err)
                });

                data.file.pipe(file);
                data.file.on('end', function (err) {
                    var ret = {
                        filename: data.file.hapi.filename,
                        headers: data.file.hapi.headers
                    }
                    reply({ 'status': 'File Uploaded success', 'data': JSON.stringify(ret) });
                })
            }
        }
    }
});
server.start((err) => {
    if (!err) {
        console.log(`The Server is Running Successfully on port no 9003`)
    }
    else {
        console.error(`There is an Error in Running the server`);
    }
})
