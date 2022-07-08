$(document).ready(function () {
  // 매칭 시작
  $('#start_btn').click(() => {
    $.ajax({
      type: "PUT",
      url: "/user/partner",
      // async: false,
      data: {},
      datatype: "text",
      success: (res) => {
        alert(res);
      },
      error: (log) => {
        if(log.responseText == '/matching'){
          alert("정보를 입력하지 않았습니다. 정보를 입력하세요!");
          location.href = log.responseText;
        } else if(log.responseText == '/login') {
          alert("로그인을 해주세요.");
          location.href = log.responseText;
        } else {
        alert(log.responseText);
        }
      }
    });
  });

  // 매칭 취소
  $('#cancel_btn').click(() => {
    $.ajax({
      type: "DELETE",
      url: "/user/partner",
      // async: false,
      data: {},
      datatype: "text",
      success: (res) => {
          localStorage.clear();           // 대화 내역 삭제
          alert(res);
          location.href = 'mypage';
      },
      error: (log) => {
        alert(log.responseText);
      }
    });
  });

  $('#modify').click(()=> {
    location.href = '/matching';
  });

  $('#chat').click(()=> {
    location.href = '/chat';
  });

  // 매칭 확인
  $('#isMatching').click(() => {
    $.ajax({
      type: "POST",
      url: "/user/status",
      // async: false,
      data: {},
      datatype: "text",
      success: (res) => {
          location.href = '/my';
      },
      error: (log) => {
        alert(log.responseText);
      }
    });
  });
})
