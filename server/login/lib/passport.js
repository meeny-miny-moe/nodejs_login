var db = require('../../db/db');
const bcrypt = require('bcrypt');
var shortid=require('shortid');

module.exports = function(app){

  // 회원가입시 pw, pw2 일치하지 않는경우 -> 오류 띄우기

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
//페이스북으로 로그인
FacebookStrategy=require('passport-facebook').Strategy;

app.use(passport.initialize());
app.use(passport.session());

/* 로그인 성공했을 때 세션 스토어에 저장*/
passport.serializeUser(function(user, done) {
 // console.log('serial',user);
  done(null,user.email);
});

passport.deserializeUser(function(email, done) {
  var user = db.get('users').find({email: email}).value();
  //console.log(user);
  done(null,user);
});

passport.use(new LocalStrategy(
  {
    usernameField : 'email',
    passwordField : 'pw'
  },
  function(username, password, done) {
    var user = db.get('users').find({email:username}).value();
      if(user){
        bcrypt.compare(password,user.pw,function(err, result){
          if(result){
            return done(null, user, {
              message:'Login Success!'
            });
          }else{
            return done(null, false,{
              message : 'Incorrect Password'
            });
          }
        });

      }else{
        return done(null, false,{
          message : 'Incorrect Data'
        });
    }
  }
));

//페이스북 로그인
var facebookCredentials=require('../route/facebook.json');
facebookCredentials.profileFields=['id','emails','name','gender','displayName'];
passport.use(new FacebookStrategy(facebookCredentials,
function(accessToken, refreshToken, profile, cb) {
  //  console.log('FacebookStrategy',accessToken,refreshToken,profile);
    var email=profile.emails[0].value;
    var puser=db.get('users').find({email:email}).value();

    // db에 정보가 있는경우(ex. 이메일로 로그인을 한 경우)
    
  if(user){
    puser.facebookId = profile.id;
    db.get('users').find({email:email}).assign(user).write();
}
else {

  var user = {
      idx:shortid.generate(),
      email:email,
      displayName:profile.displayName,
      facebookId:profile.id,
      gender:profile.gender,
      room:"",
      idealPersonality: "",
      personality: "",
      partnerIdx: "",
      partnerName: "",
      mbti: ""
  }
  db.get('users').push(user).write();
}
cb(null, user);
}
));

app.get('/auth/facebook',passport.authenticate('facebook', {
  scope:'email'
}),

(req,res,next) => {
  req.session.save((err) => {
    if(err){
      next(err);
    }
    console.log(req.session);
  })
}

);
/*
app.post('/auth/facebook',
  passport.authenticate('local',{
     failureFlash : true,
     successFlash: true
    ,failureRedirect : '/session/login'
  }),
    (req,res,next) => {
      req.session.save((err) => {
        if(err){
          next(err);
        }
        console.log(req);
        res.redirect('/');
      })
    }
  );
*/
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login', failureMessage: true }),
function(req, res) {
  res.redirect('/');
});
/*
  passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/auth/login'
  })
);
*/

  return passport;
}
