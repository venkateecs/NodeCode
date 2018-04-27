const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
const csv = require('csvtojson');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        //callback(null, file.originalname + '-' + Date.now());
        callback(null, file.originalname);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'application/vnd.ms-excel') {
            req.fileValidationError = 'Please upload only CSV Extensions';
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
    }
}).single('userPhoto');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('hello world')
});
app.get('/listOfFile', function (req, res) {
    let path = __dirname + '/uploads';
    let files = fs.readdirSync(path);
    res.json({ files: files })
});
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError);
        }
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
app.post('/getCSVFile', function (req, res) {
    let path = __dirname + '/uploads' + req.body.fileName;
    var getIndex = path.search('uploads');
    String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    var result = path.splice(getIndex + 7, 0, "/");
    var insert = result.search('Concepts') + 8;
    var resultData = result.splice(insert, 0, "/");
    console.log(resultData);
    let csvData = [];
    csv()
        .fromFile(resultData)
        .on('json', (jsonObj) => {
            //console.log('jsonOBJ' + jsonObj);
            csvData.push(jsonObj)

        })
        .on('done', (error) => {
            res.json({ statusCode: 200, data: csvData });
        })
    // res.send(path);   
});
console.log(`the app is running under port 5000`);

app.listen(5000);

