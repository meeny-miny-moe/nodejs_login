"use strict";

const toggleBtn = document.querySelector(".navbar_togglebtn");
const sidebar = document.querySelector(".navbar_side");

let gender = "";
let p_list = [];
let ip_list = [];
let personality = "";
let idealPersonality = "";
// let mbti = $('#select_mbti').val();

  $('#submit_matching').click(() => {
    if(p_list.length != 10 || ip_list.length != 10) {
      alert("모든 항목을 선택해 주세요");
    } else {
      for(let i = 0; i < 10; i++) {
        personality += p_list[i];
        idealPersonality += ip_list[i];
      }

      $.ajax({
        type: "PUT",
        url: "/user/personality-idealPersonality",
        data: {
          personality, idealPersonality, gender
        },
        datatype: "text",
        success: (res) => {
          alert('입력이 완료되었습니다!');
          location.href = '/';
        },
        error: (log) => {
          alert("'/user/personality-idealPersonality'");
        }
      });
    }
  });


toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// 나의 성격 선택
function checkMy1(element) {
  const my01 = document.querySelectorAll("#my_01");
  my01.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[0] = element.name;
}

function checkMy2(element) {
  const my02 = document.querySelectorAll("#my_02");
  my02.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[1] = element.name;
}

function checkMy3(element) {
  const my03 = document.querySelectorAll("#my_03");
  my03.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[2] = element.name;
}

function checkMy4(element) {
  const my04 = document.querySelectorAll("#my_04");
  my04.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[3] = element.name;
}

function checkMy5(element) {
  const my05 = document.querySelectorAll("#my_05");
  my05.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[4] = element.name;
}

function checkMy6(element) {
  const my06 = document.querySelectorAll("#my_06");
  my06.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[5] = element.name;
}

function checkMy7(element) {
  const my07 = document.querySelectorAll("#my_07");
  my07.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[6] = element.name;
}

function checkMy8(element) {
  const my08 = document.querySelectorAll("#my_08");
  my08.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[7] = element.name;
}

function checkMy9(element) {
  const my09 = document.querySelectorAll("#my_09");
  my09.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[8] =  element.name;
}

function checkMy10(element) {
  const my10 = document.querySelectorAll("#my_10");
  my10.forEach((my) => {
    my.classList.remove("select");
  });
  element.classList.add("select");
  p_list[9] = element.name;
}

// 상대방 선택
function checkOther1(element) {
  const other01 = document.querySelectorAll("#other_01");
  other01.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[0] = element.name;
}

function checkOther2(element) {
  const other02 = document.querySelectorAll("#other_02");
  other02.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[1] = element.name;
}

function checkOther3(element) {
  const other03 = document.querySelectorAll("#other_03");
  other03.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[2] = element.name;
}

function checkOther4(element) {
  const other04 = document.querySelectorAll("#other_04");
  other04.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[3] = element.name;
}

function checkOther5(element) {
  const other05 = document.querySelectorAll("#other_05");
  other05.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[4] = element.name;
}

function checkOther6(element) {
  const other06 = document.querySelectorAll("#other_06");
  other06.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[5] = element.name;
}

function checkOther7(element) {
  const other07 = document.querySelectorAll("#other_07");
  other07.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[6] = element.name;
}

function checkOther8(element) {
  const other08 = document.querySelectorAll("#other_08");
  other08.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[7] = element.name;
}

function checkOther9(element) {
  const other09 = document.querySelectorAll("#other_09");
  other09.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[8] = element.name;
}

function checkOther10(element) {
  const other10 = document.querySelectorAll("#other_10");
  other10.forEach((other) => {
    other.classList.remove("select");
  });
  element.classList.add("select");
  ip_list[9] = element.name;
}
