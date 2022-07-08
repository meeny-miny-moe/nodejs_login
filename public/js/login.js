'use strict';

// 기본값 : querySelector
const $frm = document.querySelector('form');
const $input = document.querySelectorAll('.intArea input');
const $email = document.querySelector('#email');
const $pw = document.querySelector('#pw');
const $errMsg = document.querySelector('#errMsg');

// 기본값 : form에 onsubmit 속성 추가
$frm.setAttribute('onsubmit', 'return checkLogin()');

// 함수 : 이메일 검증 (정규표현식 활용)
function checkEmail(str) {
  const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!regEmail.test(str)) {
    return false;
  }else {
    return true;
  }
}

// 함수 : form의 onsubmit함수
function checkLogin() {
  if (!$email.value) { //이메일 존재하는지
    $errMsg.textContent = '이메일 계정을 입력하십시오.';
    $email.focus();
  } else if (!checkEmail($email.value)) { //이메일 형식에 맞는지
    $errMsg.textContent = '이메일 형식이 올바르지 않습니다.';
    $email.focus();
  } else if (!$pw.value) { //비밀번호 존재하는지
    $errMsg.textContent = '비밀번호를 입력하십시오';
    $pw.focus;
  } else {
    $errMsg.textContent = null;
    return true;
  } return false;
}
// 함수 : input 값에 따라 class 부여
function onInput(input) {
  return () => {
    if (!input.value) {
      input.setAttribute('class', 'noInput');
    } else {
      input.setAttribute('class', 'onInput');
    }
  }
}

// 이벤트 리스너 : .intArea input에 onInput 실행
$input.forEach(item => item.addEventListener('input', onInput(item)));