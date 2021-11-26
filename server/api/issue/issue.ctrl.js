const { Issue } = require("../../model/Issue");
const { RankingIssue } = require("../../model/Ranking");
const { User } = require("../../model/User");
const { auth } = require("../../middleware/auth");

const mongoose = require("mongoose");

//유효한 id인지 체크 function
const checkId = (req, res, next) => {
  const id = req.params.id;
  console.log("checkId 유효한 id체크 : " + id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

const tokenTest = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    console.log(result);
    res.json(result);
  });
};

//목록 조회
const list = (req, res) => {
  console.log(req.query);
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit)) return res.status(400).end();
  // console.log("list 조회 : " + req.params.id);

  Issue.find((err, result) => {
    if (err) return res.status(500).end();
    // console.log(result);
    res.json(result);
  })
    .limit(10)
    .sort({ _id: 1 }); // -1 최신순, 1 역순
};

//상세조회 (localhost:5000/api/issue/:id)
const detail = (req, res) => {
  const id = req.params.id;
  //id로 조회
  Issue.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();

    //=================조회수 처리=================
    // 오류 : 새로고침으로 조회수 무한대 증가 가능 (이슈업(공감)할 때도 조회수 올라감)
    // 참고 : https://ip99202.github.io/posts/nodejs-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EC%A1%B0%ED%9A%8C%EC%88%98-%EA%B5%AC%ED%98%84/
    result.issueViewCnt++;
    result.save();
    console.log("조회수 + 1");
    res.json(result);
    // res.render("issue/detail", { result });
  }).populate(["ups.user"]);
};

const myPageUps = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    console.log(result.upsIssue);
    res.json(result.upsIssue);
  });
};

const myPageIssue = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    console.log(result.createdIssue);
    res.json(result.createdIssue);
  });
};

//등록 (POST localhost:5000/api/issue)
// - 성공 : id값 채번, 입력된 data값으로 객체를 만들고
//         배열 추가(201: Created)
// - 실패 : 값 누락시 (400 : Bad Request)
const create = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    const {
      issueTitle,
      issueContents,
      issueHashtag,
      issueCategory,
      active,
      issueViewCnt,
    } = req.body;

    const _id = result.id;
    const author = result.name;
    const issueAuthor = { _id, author };

    //=================한국시간 처리=================
    function getCurrentDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var today = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
    }

    const issueDate = getCurrentDate();
    const issueModifiedDate = getCurrentDate();
    if (!issueTitle || !issueContents) return res.status(400).end();

    Issue.create(
      {
        issueTitle,
        issueContents,
        issueHashtag,
        issueCategory,
        issueAuthor,
        issueViewCnt,
        issueDate,
        issueModifiedDate,
        active,
      },
      (err, result) => {
        if (err) return res.status(500).end();
        res.status(201).json(result);
        const id = result.id;
        const active = result.active;
        RankingIssue.create({ id }, (err, result) => {
          if (err) return res.status(500).send("랭킹 업로드 시 오류 발생");
        });

        var newCreatedIssue = eval({ issueId: "", active: "" });
        newCreatedIssue.issueId = id;
        newCreatedIssue.active = active;
        console.log(newCreatedIssue);

        User.findByIdAndUpdate(
          _id,
          { $push: { createdIssue: [newCreatedIssue] } },
          { new: true },
          (err, result) => {
            if (err)
              return res
                .status(500)
                .send("사용자 createdIssue에 추가하던 중 오류가 발생했습니다!");
          }
        );
      }
    );
  });
};

//ups생성 (post localhost:5000/api/issue/:id/ups)
// ups 유저값 추가
// 유저스키마에도 넣기
// req.cookies.x_auth
const createUps = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    var newUps = eval({ user: "", createAt: "" });
    var newUpsList = eval({ issueId: "", createdAt: "" });
    var issueId = req.params.id;

    console.log(result);

    newUps.user = result.id;
    newUpsList.issueId = issueId;

    console.log(newUps.user);
    //=================한국시간 처리=================
    function getCurrentDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var today = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
    }

    newUps.createAt = getCurrentDate();
    newUpsList.createdAt = getCurrentDate();

    console.log(newUps);
    console.log(newUpsList);

    //{ $push: { ups: { newUps } } },
    Issue.findByIdAndUpdate(
      issueId,
      { $push: { ups: [newUps] } },
      { new: true },
      (err, result) => {
        if (err) return res.status(500).send("ups 시 오류가 발생했습니다!");

        res.status(201).json(result);
      }
    );

    User.findByIdAndUpdate(
      result.id,
      { $push: { upsIssue: [newUpsList] } },
      { new: true },
      (err, result) => {
        if (err)
          return res
            .status(500)
            .send("사용자 upsList에 추가하던 중 오류가 발생했습니다!");
      }
    );
  });
};

//수정 (PUT localhost:5000/api/issue/:id)
// - 성공 : id에 해당하는 객체의 값을 변경 후 리턴(200: OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//         해당하는 id가 없는 경우(404 : Not Found)
const update = (req, res) => {
  const id = req.params.id;

  const { issueTitle, issueContents, issueHashtag, issueCategory, active } =
    req.body;

  //=================한국시간 처리=================
  function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
  }

  const issueModifiedDate = getCurrentDate();

  //id값 유효한지 확인
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  //id에 해당하는 Document에 입력받은 Data로 Update
  Issue.findByIdAndUpdate(
    id,
    {
      issueTitle,
      issueContents,
      issueHashtag,
      issueCategory,
      issueModifiedDate,
      active,
    },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다!");
      if (!result) return res.status(404).end("해당하는 정보가 없습니다!");
      res.json(result);
    }
  );
};

//delete (DELETE localhost:5000/api/issue/:id)
const remove = (req, res) => {
  const id = req.params.id;

  //id에 해당하는 Document를 찾아서 DB에서 삭제
  Issue.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다!");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);

    User.findOne({ token: req.cookies.x_auth }, (err, result) => {
      var userId = result.id;
      User.findByIdAndUpdate(
        userId,
        { $pull: { createdIssue: { issueId: id } } },
        { new: true },
        (err, result) => {
          if (err) return res.status(500).send("수정 시 오류가 발생했습니다!");
          if (!result) return res.status(404).end("해당하는 정보가 없습니다!");
        }
      );
    });
  });

  RankingIssue.findOneAndDelete({ id: id }, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다!");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
  });
};

//delete (DELETE localhost:5000/api/issue/:id/ups/:upId)
const removeUps = (req, res) => {
  const issueId = req.params.id;
  const upId = req.params.upId;

  Issue.findByIdAndUpdate(
    issueId,
    {
      $pull: { ups: { _id: upId } },
    },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다!");
      if (!result) return res.status(404).end("해당하는 정보가 없습니다!");
      res.json(result);
    }
  );
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    var userId = result.id;
    User.findByIdAndUpdate(
      userId,
      { $pull: { upsIssue: { issueId: issueId } } },
      { new: true },
      (err, result) => {
        if (err) return res.status(500).send("수정 시 오류가 발생했습니다!");
        if (!result) return res.status(404).end("해당하는 정보가 없습니다!");
      }
    );
  });
};

module.exports = {
  tokenTest,
  list,
  detail,
  myPageUps,
  myPageIssue,
  create,
  update,
  createUps,
  remove,
  removeUps,
  checkId,
};
