// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var combat = require('./modules/combat.js');


app.use(express.static(__dirname + '/node_modules')); 
app.use(express.static(__dirname + '/client/public'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/client/index.html');
});
console.log('hello world');
server.listen(4200);  
console.log('hello world 4200');

var userCount = 0;
var roomCount = 1;
var maxInRoom = 8;

var clientList = {}

io.on('connection', function (client){
  console.log('Client connected...');
  
  client.on('join', function (data){
    clientList[client.id] = { 
      'username': data
    };
    var joinData = { 
      'user': 'server', 
      'message': data + ' has joined the room' 
    };
    
    var rooms = io.sockets.adapter.rooms
    if(rooms['room' + roomCount] && rooms['room' + roomCount]['length'] >= maxInRoom){
      roomCount++;
    }
    client.room = 'room' + roomCount;
    client.join(client.room);
    
    client.emit('broad', joinData);
    client.broadcast.to(client.room).emit('broad', joinData);
    
  });
  
  client.on('message', function (data){
    var dataToEmit = {
      'user': 'You'
    }
    
    var dataToBroad = {
      'user': clientList[client.id].username
    }
    
    if(data.message.indexOf('/') > -1){
      dataToEmit['message'] = combat.roll(client);
    }else{
      dataToEmit['message'] = data.message;
      dataToBroad['message'] = data.message;
    }
    
    if(dataToEmit.message){
      client.emit('broad', dataToEmit);
    }
    if(dataToBroad.message){
      client.broadcast.to(client.room).emit('broad', dataToBroad);
    }
  });
});