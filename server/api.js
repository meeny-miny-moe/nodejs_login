const table = 'users';

exports.api = function(app, db) {
  app.put('/user/personality-idealPersonality', (req, res) => {
    // db.get(table)
    // .find({email: req.session.passport.user})
    // .assign({gender: ""})
    // .assign({personality: ""})
    // .assign({idealPersonality: ""})
    // .write();

    db.get(table)
    .find({email: req.session.passport.user})
    .assign({gender: req.body.gender})
    .assign({personality: req.body.personality})
    .assign({idealPersonality: req.body.idealPersonality})
    .write();

    res.status(200).send("ok");
  });

  app.post('/user', (req, res) => {
    var tmp = db.get(table).find({email: req.session.passport.user}).value();
    if(tmp.partnerName == "") {
      res.status(404).send("매칭된 상대가 없습니다. 매칭을 시작해 주세요");
    } else {
      res.send(
        JSON.stringify(tmp, function(key, value) {
          if(key == 'pw') { return undefined; }
          return value;
        })
      );
    }
  });

  app.post('/partner/name', (req, res) => {
    let user = db.get(table).find({email: req.session.passport.user}).value();
    res.send( user.partnerName );
  })

  app.post('/meassage', (req, res) => {
    let msg_list = db.get('msg').filter({room: req.body.room}).value();
    let user = db.get(table).find({idx: req.body.idx}).value();
    db.get('msg').remove({person: user.partnerIdx}).value();
    res.send(msg_list);
  })

  app.post('/user/status', (req, res) => {
    let user = db.get(table).find({email: req.session.passport.user}).value();
    if(user.partnerIdx != "") {
      res.status(200).send();
    }
    else {
      res.status(404).send("매칭된 상태가 아닙니다.");
    }
  })
}
