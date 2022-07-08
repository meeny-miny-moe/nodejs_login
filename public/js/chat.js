let socket = io();
let chatBox = $('#chatBox');
let chatInput = $('#chatInput');
let partnerName = "";
let room, idx;
let num = 0;
let chatList = [];
let chat = {
  type: "",
  time: "",
  msg: ""
}

// id="chatInput" 에서 엔터키를 눌렀을 떄
chatInput.keydown(function(key) {
  if (key.keyCode == 13) {
    if(chatInput.val() != '')
      sendMsg();
  }
});

// id="chatMessageSendBtn" 버튼을 클릭했을 때
$('#send_btn').click(() => {
  sendMsg();
});

// 채팅 페이지로 진입 시 현재 사용자의 idx 값을 보냄
$(document).ready(function() {
  $.ajax({
    type: "POST",
    url: "/user",
    async: false,
    data: {},
    datatype: "text",
    success: (res) => {
      socket.emit('idx', (JSON.parse(res)).idx);
      idx = (JSON.parse(res)).idx;
      partnerName = (JSON.parse(res)).partnerName;
      room = (JSON.parse(res)).room;
      $('#chatName').text(partnerName);
    },
    error: (log) => {
      alert("대화 상대가 없습니다. 매칭을 시작해 주세요.");
      location.href = '/';
    }
  });

  // localStorage에 저장된 대화내역을 불러옴
  for(i = 0; i < localStorage.length; i++) {
    let prevMsg = JSON.parse(localStorage.getItem(i));
    let chatLine = "";
    if(prevMsg.type == 'myMsg') {
      chatLine += `<div class="msg_box">
                      <div class="time">${prevMsg.time}</div>
                      <div class="msg_border">
                        <div class="myMsg">
                          ${prevMsg.msg}
                        </div>
                      </div>
                    </div>
                  `;
    } else {
      chatLine += `<div class="line">
                      <div class="name">${partnerName}</div>
                      <div class="p_msg_box">
                        <div class="msg_border">
                          <div class="ans">
                            ${prevMsg.msg}
                          </div>
                        </div>
                        <div class="time">  ${prevMsg.time}</div>
                      </div>
                    </div>
                  `;
    }

    chatBox.append(chatLine);
  }


  $.ajax({
    type: "POST",
    url: "/meassage",
    async: false,
    data: {room: room, idx: idx},
    datatype: "text",
    success: (res) => {
      let msg_list = res;
      for(i = 0; i < msg_list.length; i++) {
        if(idx != msg_list[i].person) {
        chatBox.append(`<div class="line">
                          <div class="name">${partnerName}</div>
                          <div class="p_msg_box">
                            <div class="msg_border">
                              <div class="ans">
                                ${msg_list[i].msg}
                              </div>
                            </div>
                            <div class="time">  ${msg_list[i].time}</div>
                          </div>
                        </div>`
                      );     //내가 보낸 메세지 표시
        chatBox.scrollTop(chatBox.prop('scrollHeight'));
        setChatToStorage(msg_list[i].msg, "ans", msg_list[i].time);
        }
      }
    },
    error: (log) => {
      // alert("err");
    }
  });

  num = localStorage.length;
  chatBox.scrollTop(chatBox.prop('scrollHeight'));
});




// 사용자가 서버로 msg를 보냄. msg는 id='chatBox'에 append
function sendMsg() {
  let msg = chatInput.val();

  socket.emit('send', msg);            // chatInput의 값을 서버로 전송
  setChatToStorage(msg, "myMsg", getTime());

  chatBox.append(`
                  <div class="msg_box">
                    <div class="time">${getTime()}</div>
                    <div class="msg_border">
                      <div class="myMsg">
                        ${msg}
                      </div>
                    </div>
                  </div>
                  `
                );     //내가 보낸 메세지 표시
  chatInput.val('');

  chatBox.scrollTop(chatBox.prop('scrollHeight'));
}

// 서버에서 상대방 msg를 받아와서 id='chatBox'에 append

socket.on('responseMsg', function(answer) {
  chatBox.append(`<div class="line">
                    <div class="name">${partnerName}</div>
                    <div class="p_msg_box">
                      <div class="msg_border">
                        <div class="ans">
                          ${answer}
                        </div>
                      </div>
                      <div class="time">  ${getTime()}</div>
                    </div>
                  </div>`
                );     //내가 보낸 메세지 표시
  chatBox.scrollTop(chatBox.prop('scrollHeight'));
  setChatToStorage(answer, "ans", getTime());
});


function setChatToStorage(msg, type, time) {
  chat.type = type;
  chat.time = time;
  chat.msg = msg;
  localStorage.setItem(num++, JSON.stringify(chat));
}

function getTime() {
  let date = new Date();
  let hours = '0';
  let minutes = '0';
  if(date.getHours() < 10) { hours += date.getHours() } else { hours = date.getHours()};
  if(date.getMinutes() < 10) { minutes += date.getMinutes() } else { minutes = date.getMinutes()};

  return hours + ":" + minutes;
}
