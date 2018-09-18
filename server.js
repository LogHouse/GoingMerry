var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
    res.sendfile("client.html");
});

var count = 1;

io.on( 'connection', function(socket){
    console.log('user connected: ', socket.id );    // 접속한 사람의 소켓정보가 날아옴
    
    io.to(socket.id).emit('drawaccept',count);

    socket.on('disconnect', function(){
        console.log('user disconnected: ', socket.id );
    });

    socket.on('draw', function(text){
        console.log( text );
    });
});

http.listen(3000, function(){
    console.log("server on!");
});