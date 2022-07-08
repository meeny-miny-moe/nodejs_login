
exports.chatting = function(socket, http, server, io, db, app) {
  io.on('connection', function(socket) {
    let idx, state, id, room;

    // 채팅 페이지로 진입 시 현재 사용자의 idx 값을 받아옴
    socket.on('idx', (res)=>{
      idx = res;
      id = " [ " + socket.id + ", " + idx + " ] ";
      room = (db.get('users').find({idx: idx}).value()).room;
    })

    // idx 값을 받아오기 위해 잠깐 기다림
    setTimeout(() => {
      socket.join(room);
      console.log(id + "join room `" + room + "`");

      socket.on('send', function(msg) {    // view -> server
        state = (socket.adapter.rooms.get(room)).size
        console.log(id + " " + msg);
        if(state == 1) {
          db.get('msg').push({
            room: room,
            person: idx,
            time: getTime(),
            msg: msg
          }).write();
        } else {
          socket.broadcast.to(room).emit('responseMsg', msg);
        }
      });   // send
    }, 1000);

    socket.on('disconnect', function() {
      console.log(id + 'disConnect');
    });   // discconnet

    function getTime() {
      let date = new Date();
      let hours = '0';
      let minutes = '0';
      if(date.getHours() < 10) { hours += date.getHours() } else { hours = date.getHours()};
      if(date.getMinutes() < 10) { minutes += date.getMinutes() } else { minutes = date.getMinutes()};

      return hours + ":" + minutes;
    }
  });   // connection
}
