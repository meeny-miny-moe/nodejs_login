'use strict';

// 기본값 : querySelector
const $intArea = document.querySelectorAll('.intArea');
const $input = document.querySelectorAll('.intArea input');
const $errMsg = document.querySelectorAll('.errMsg')
const $btn = document.querySelector('.btnArea input');

// 기본값 : 버튼 비활성화
$btn.disabled = true;

// 기본값 : 입력값 상태 객체
const inputStat = {
  email: false,
  pw: false,
  pw2: false,
  displayName: false,
}

// 함수 : 이메일 검증
function checkEmail(str) {
  const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!regEmail.test(str)) {
    return false;
  } else {
    return true;
  }
}

// 함수 : 비밀번호 비교
function comparePw() {
  const $pw = document.querySelector('#pw');
  const $pw2 = document.querySelector('#pw2');
  if ($pw.value === $pw2.value) {
    return true;
  } else {
    return false;
  }
}

// 함수 : 버튼 활성화
function btnActive() {
  if (Object.values(inputStat).includes(false)) { // inputStat의 value 배열에 false가 있는가  
    $btn.disabled = true; // 버튼 비활성화
  } else {
    $btn.disabled = false; // 버튼 활성화
  }
};

// 함수 : 입력값 상태 변경
function changeStat(key, cond, cb) {
  return () => {
    if (cond()) {
      inputStat[key] = true;
    } else {
      inputStat[key] = false;
    } return cb();
  }
}

// 이벤트 리스너 : inputStat 변경
$input[0].addEventListener('input', changeStat('email', () => checkEmail($input[0].value), btnActive));
$input[1].addEventListener('input', changeStat('pw', () => Boolean($input[1].value), changeStat('pw2', comparePw, btnActive)));
$input[2].addEventListener('input', changeStat('pw2', comparePw, btnActive));
$input[3].addEventListener('input', changeStat('displayName', () => Boolean($input[3].value), btnActive));

// 이벤트 리스너 : .intArea input에 따라 클래스 추가
$input.forEach((input, i) => {
  // focus 이벤트 : intArea에 focus, errMsg에 hide 추가
  input.addEventListener('focus', () => {
    $intArea[i].classList.add('focus');
    $errMsg[i].classList.add('hide');
  });
  // input 이벤트 : input의 value에 따라 intArea에 active 추가 및 제거
  input.addEventListener('input', () => {
    if (!input.value) {
      $intArea[i].classList.remove('active');
    } else {
      $intArea[i].classList.add('active');
    }
  });
  // blur 이벤트 : 1. intArea에 focus 제거 2. input의 value와 inputStat의 상태에 따라 errMsg에 hide 추가 및 제거
  input.addEventListener('blur', () => {
    $intArea[i].classList.remove('focus');
    if (!Boolean(input.value) || Object.values(inputStat)[i]) {
      $errMsg[i].classList.add('hide');
    } else {
      $errMsg[i].classList.remove('hide');
    }
  });
});