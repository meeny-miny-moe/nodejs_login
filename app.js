const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
var db = require('./server/db/db.js');
const dir = "./public";         //html 라우팅을 위한 변수
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);
const matching = require('./server/matching');
const chat = require('./server/socket');
const api = require('./server/api');
const route = require('./server/route');

//미들웨어 호출 코드
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.use(flash());
app.use(session({
  secret : 'dska!@#!jkjs!',
  resave : false,
  saveUninitialized : true,
  store : new FileStore('./server/login/sesseions')
}))


// static 폴더 설정
//app.use('/', express.static(path.join(__dirname, dir)));

// home화면 동적으로 받기
var homeRouter = require('./server/login/route/home');
app.use('/',homeRouter);


// csp 에러 때문에 추가
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
app.use(expressCspHeader({
    directives: {
        'script-src': [SELF, INLINE,
          "https://localhost:3000",
          "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
          "https://kit.fontawesome.com/5b7a7cfcb5.js"
        ],
    }
}));

server.listen(port,function(){
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get(function(req, res, next) {
  res.status(404).send('sorry can not found that');
});

chat.chatting(socket, http, server, io, db, app);   //채팅
api.api(app, db);
route.route(app, fs, dir);                          //route

// 매칭에 대한 요청
matching.userMatching(app, db);
matching.matchCancel(app, db)

// 로그인 라우터
var passport = require('./server/login/lib/passport')(app);
var sessionRouter = require('./server/login/route/session')(passport);
app.use('/session',sessionRouter);

// 마이페이지 라우터
var mypageRouter = require('./server/login/route/mypage');
app.get('/mypage',mypageRouter);

// 로그아웃 라우터
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
app.get('/logout', function(request, response){
  request.logout();
  request.session.save(function(){
    response.redirect('/');
  });
});
