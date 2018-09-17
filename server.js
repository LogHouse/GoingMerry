
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server); 	// http server를 socket.io server로 upgrade한다

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
// get방식으로 보내진 데이터를 수용하는 메소드인듯 첫번째 파라미터는 로컬호스트의 상대적 우치ㅣ
// req : request,  res : response

app.get('/', function(req, res) {		
  res.sendFile(__dirname + '/client.html');
});

// 이미 정해진 룰인지는 모르겠지만 'connection' 이라는 메시지가 오기를 기다림
// connection event handler
// connection이 수립되면 event handler function의 인자로 socket이 들어온다

/*
connection 된순간 오는 소켓은 접속한 한명 하지만 또다른 한명이 오면
또다른 사람이 오는듯 접속이 이루어지는 connection은 내가  정한게 아닌 공통이므로
따로 데이터형식 및 프로토콜 규약을 정한적이 없음. 그래서 니 데이터를 보내고 니가 보낸 데이터를
서버와 클라이언트간의 데이터처리를 하는 io와 소켓 으로 나눠서 처리하겠다.
connection에 날라오는 소켓은 임의의 난수 데이터 사용자는 알지 못하는 하지만 로그인 메시지의 리스너의 데이터는
클라이언트에서 데이터 타입과 내용을 지정해서 보내는것
*/
io.on('connection', function(socket) {	// 여기서의 socket은 socket.io의 소켓이 아닌 각 클라이언트들의 소켓정보
	
	console.log('client logged-in : ', socket.id );

	socket.on('update', function(pos){
		io.emit('update',  pos );
	});

	socket.on('disconnect', function() {
		console.log('user disconnected: ' + socket.name);
	});
});


server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});

/*
socket정보는 알아서 날라가고 클라이언트가 보내야 하는 데이터는 오직 유저 아이디와 메시지 뿌
*/