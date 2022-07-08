
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var db = require('../../db/db');
const shortid = require('shortid');
const { authenticate } = require('passport');

module.exports = function(passport){

router.post('/login_process',
  passport.authenticate('local',{
     failureFlash : true,
     successFlash: true,
     failureRedirect : '/login'
  }),
    (req,res,next) => {
      req.session.save((err) => {
        if(err){
          next(err);
        }
        res.redirect('/');
      })
    }
  );

  router.post('/to_register', function(request,response){
    var post = request.body;
    var email = post.email;
    var pw = post.pw;
    var pw2 = post.pw2;
    var displayName=post.displayName;
    var gender=post.gender;
    var room="";
    var idealPersonality="";
    var personality="";
    var partnerIdx="";
    var partnerName="";


  // console.log(gender);


    var mbti="";

   // console.log(gender);


    if(db.get('users').find({email:email}).value() && db.get('users').find({email:""}).value()){
        request.flash('error','중복된 아이디가 있거나 아이디가 비었습니다.');
        response.redirect('/register');
    }else{
    if(pw !== pw2){
            request.flash('error','비밀번호를 똑같이 입력해주세요.')
            response.redirect('/register');
          }else{
            bcrypt.hash(pw, 10, function(err, hash){
              var puser=db.get('users').find({email:email}).value();
              if(puser){
                puser.password=hash;
                puser.displayName=displayName;
                db.get('users').find({idx:puser.id}).assign(puser).write();
              }
              else{
                var user = {
                  idx : shortid.generate(),
                  email : email,
                  pw : hash,
                  displayName:displayName,
                  gender:gender,
                  room:room,
                  idealPersonality:idealPersonality,
                  personality:personality,
                  partnerIdx:partnerIdx,
                  partnerName:partnerName,
                  mbti: mbti
                    };
                    db.get('users').push(user).write();
              }
                  request.login(user, function(err){
                    response.redirect('/login'); // 회원가입 성공하면 회원 정보 입력 페이지 구현되면 이동시키기
                  })
            });
          }
        }
   });

  router.get('/logout', function(request, response){
    request.logout();
    request.session.save(function(){
      response.redirect('/');
    });
  });
  return router;
}
