// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules')); 
app.use(express.static(__dirname + '/client/public'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/client/index.html');
});
console.log('hello world');
server.listen(4200);  
console.log('hello world 4200');


