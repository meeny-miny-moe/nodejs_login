var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var status = require('../lib/status.js');


function authIsOwner(request,response){
  if(typeof request.session.passport === 'undefined'|| request.session.passport === null){
    return false;
  }
  else {
    if(Object.keys(request.session.passport)=='user'){
     // console.log('여기걸림4');
      return true;
    }else{
   //   console.log('여기걸림5');
      return false;
    }

}
}

var url = require('url');
function getFormattedUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
}



router.get('/', function(request, response){
  //console.log('/',request);
  //console.log("화면이동 성공");

  //console.log(getFormattedUrl(request));
  //console.log('request.session',request.session);
 // console.log('함수:',Object.keys(request.session.passport));

  var authStatusUI = `<a href="/login">로그인</a>`
  if(authIsOwner(request,response)){
    authStatusUI=`<a href="/mypage">마이페이지</a>&nbsp&nbsp&nbsp&nbsp<a href="/logout">로그아웃</a>`
  }

    var msg = request.flash();
    var alert = '';
    if(msg.success){
      alert = msg.success[0];
    }
    if (getFormattedUrl(request).indexOf('#') > -1) {
      getFormattedUrl(request)= '/';
  }
    var _template = template.web(authStatusUI //, myPage
      /*
      `
      <h1 style="color:blue;">${alert}</h1>
      <h2>${title}</h2>${text}
      <form action="/userMatch" method="get">
        <input type="submit" name="" value="매칭하기">
      </form>
      <form action="/chat" method="get">
        <input type="submit" name="" value="chat">
      </form>
      `
      ,
      `<a href="/router/create">create</a>`,
      */

    );
    response.send(_template);
});
    module.exports = router;
