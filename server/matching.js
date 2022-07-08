let users = 'users';

exports.userMatching = function(app, db) {
  app.put('/user/partner', (req, res) => {
    let partnerList = [];
    let list = [];
    let table = db.get(users);
    let user;
    let room, count = 0;


    try {
      user = table.find({email: req.session.passport.user}).value();

      // 현재 유저와 반대 성별을 가진 사용자를 db에서 찾아 partnerList에 저장
      if(user != "" && user.gender == "Man") {
        let partnerList = getPartnerList("Woman");
      } else if(user != "" && user.gender == "Woman") {
        let partnerList = getPartnerList("Man");
      }
      // if(partnerList.length < 15) {
      //   randomMatching();
      // } else {
        personalityMatching();
      // }

    } catch (e) {
      res.status(404).send('/login');
    }

//-------------------------------------------------------------------------------------
  function randomMatching() {
    let index = Math.floor(Math.random() * partnerList.length);
    let partner = partnerList[index];
    if(user.partnerIdx == "") {
      setPartner(partner);
      res.status(200).send("매칭 상대가 정해졌습니다. 채팅 페이지로 이동하여 대화하세요!");
    } else {
      res.status(404).send('이미 매칭된 상대가 있습니다!');
    }

  } //randomMatching

  function personalityMatching() {
    // 나의 성격과 원하는 상대 성격을 바탕으로 유사도가 높은 순으로 매칭
    if(user.partnerIdx == "") {
      if(user.personality != "" && user.idealPersonality != "") {
        for(i = 0; i < partnerList.length; i++) {
          let count = 0;
          for(j = 0; j < 10; j++) {
            if(partnerList[i].personality == "") {
              console.log("없음 " + partnerList[i].idx);
              break;
            }
            if((user.idealPersonality).charAt(j) == (partnerList[i].personality).charAt(j)) {
              count++;
            }
          }
          list.push({
            name: partnerList[i].displayName,
            idx: partnerList[i].idx,
            similarity: count
          })
        }

        list.sort(function(a, b)  {
          return b.similarity - a.similarity;
        });

        // similarity가 제일 높은 그룹 중에서 랜덤 선택
        let s_count = list[0].similarity;
        let tmp = list.filter(list => list.similarity == s_count)
        let rand = Math.floor(Math.random() * tmp.length);
        let partner = list[rand];

        if(partnerList.length == 0) {
          res.status(404).send('매칭 할 상대가 없습니다. 잠시 후 다시 시도해주세요');
        } else {
        setPartner(partner);
        res.status(200).send("매칭 상대가 정해졌습니다. 채팅 페이지로 이동하여 대화하세요!");
        }

      } else {
        res.status(404).send('/matching');
      }   // if(user.personality != "" && user.idealPersonality != "")

    } else {
      res.status(404).send('이미 매칭된 상대가 있습니다!');
    }   // if(user.partner)
  } //personalityMatching

    function setPartner(partner) {
      room = partner.idx + "-" + user.idx;

      table.find({idx: user.idx})
            .assign({room: room})
            .assign({partnerName: partner.name})
            .assign({partnerIdx: partner.idx})
            .write();

      table.find({idx: partner.idx})
            .assign({room: room})
            .assign({partnerName: user.displayName})
            .assign({partnerIdx: user.idx})
            .write();
    } //setPartner

    function getPartnerList(gender) {
      partnerList = db.get(users)
                      .filter({gender: gender})     // 성별이 반대이면서
                      .filter({partnerIdx: ""})        // 매칭이 안된사람
                      .value();
    } //getPartnerList
  });
} // exports.userMatching

// 매칭 취소 & 매칭 상대 삭제
exports.matchCancel = function(app, db) {
  app.delete('/user/partner', (req, res) => {
    let email = req.session.passport.user;
    let table = db.get(users);
    let user = table.find({email: email}).value();

    db.get('msg').remove({room: user.room}).write();

    if(user.room != "") {
      let partnerIdx = user.partnerIdx;
      table.find({email: email})
            .assign({room: ""})
            .assign({partnerIdx: ""})
            .assign({partnerName: ""})
            .write();

      table.find({idx: partnerIdx})
            .assign({room: ""})
            .assign({partnerIdx: ""})
            .assign({partnerName: ""})
            .write();

      res.status(200).send("매칭이 취소되었습니다! ");
    } else {
      res.status(400).send("매칭된 상대가 없습니다. 매칭을 진행하세요!");
    }
  });
}
