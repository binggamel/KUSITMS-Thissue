const { Issue } = require("../../model/Issue");
const { RankingIssue } = require("../../model/Ranking");
const { User } = require("../../model/User");

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

//목록 조회
const list = (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10);
  if (Number.isNaN(limit)) return res.status(400).end();
  // console.log("list 조회 : " + req.params.id);

  Issue.find((err, result) => {
    if (err) return res.status(500).end();
    // console.log(result);
    res.json(result);
    //   res.render("issue/list", { result });
  })
    .limit(10)
    .sort({ _id: -1 }); //최신순
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
    // res.render("issue/detail", { result });
  }).populate(["ups.user"]);
};

//등록 (POST localhost:5000/api/issue)
// - 성공 : id값 채번, 입력된 data값으로 객체를 만들고
//         배열 추가(201: Created)
// - 실패 : 값 누락시 (400 : Bad Request)
const create = (req, res) => {
  // ups(업한 유저) 아직 안함!!
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    const {
      // issueId,
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
    //   필수 data 누락시 오류 처리 (400 : Bad Request)
    if (!issueTitle || !issueContents) return res.status(400).end();

    //   id(db에서 자동 부여되는)값 자동 채번
    Issue.create(
      {
        //   issueId,
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
        RankingIssue.create({ id }, (err, result) => {
          if (err) return res.status(500).send("랭킹 업로드 시 오류 발생");
        });
      }
    );
  });
};

//ups생성 (post localhost:5000/api/issue/:id/ups)
// ups 유저값 추가
// req.cookies.x_auth
const createUps = (req, res) => {
  User.findOne({ token: req.cookies.x_auth }, (err, result) => {
    // var _id = result.id;
    var newUps = eval({ user: "", createAt: "" });
    console.log(newUps);

    newUps.user = result.id;

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

    console.log(newUps);

    var issueId = req.params.id;
    //{ $push: { ups: { newUps } } },
    Issue.findByIdAndUpdate(
      issueId,
      { $push: { ups: [newUps] } },
      { new: true },
      (err, result) => {
        if (err) return res.status(500).send("ups 시 오류가 발생했습니다!");
        console.log(result);
        res.status(201).json(result);
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

  //id에 해당하는 Document를 찾아ㅏ서 DB에서 삭제
  Issue.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다!");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });

  RankingIssue.findOneAndDelete({ id: id }, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다!");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
  });
};

const removeUps = (req, res) => {
  const issueId = req.params.id;
  const upId = req.params.upId;

  //{ $push: { ups: [newUps] } }
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
};

//페이지 뿌리는 부분

const showCreatePage = (req, res) => {
  //   res.render("issue/create");
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  Issue.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    // res.render("issue/update", { result });
  });
};

module.exports = {
  list,
  detail,
  create,
  update,
  createUps,
  remove,
  removeUps,
  checkId,
  showCreatePage,
  showUpdatePage,
};
