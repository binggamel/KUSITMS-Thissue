const IssueModel = require("../../model/Issue");
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
  console.log("list 조회 : " + req.params.id);

  IssueModel.issueCollection
    .find((err, result) => {
      if (err) return res.status(500).end();
      console.log(result);
      //   res.render("issue/list", { result });
    })
    .limit(limit)
    .sort({ _id: -1 }); //최신순
};

//상세조회 (localhost:5000/api/issue/:id)
const detail = (req, res) => {
  const id = req.params.id;
  //id로 조회
  IssueModel.issueCollection.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();

    //=================조회수 처리=================
    // 오류 : 새로고침으로 조회수 무한대 증가 가능 (이슈업(공감)할 때도 조회수 올라감)
    // 참고 : https://ip99202.github.io/posts/nodejs-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EC%A1%B0%ED%9A%8C%EC%88%98-%EA%B5%AC%ED%98%84/
    result.issueViewCnt++;
    result.save();
    // res.render("issue/detail", { result });
  });
};

//등록 (POST localhost:5000/api/issue)
// - 성공 : id값 채번, 입력된 data값으로 객체를 만들고
//         배열 추가(201: Created)
// - 실패 : 값 누락시 (400 : Bad Request)
const create = (req, res) => {
  // ups(업한 유저) 아직 안함!!
  const {
    // issueId,
    issueTitle,
    issueContents,
    issueHashtag,
    issueCategory,
    issueAuthor,
    active,
    issueViewCnt,
  } = req.body;

  //=================한국시간 처리=================
  function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(
      Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
    );
  }

  const issueDate = getCurrentDate();
  const issueModifiedDate = getCurrentDate();
  //   필수 data 누락시 오류 처리 (400 : Bad Request)
  if (!issueTitle || !issueContents) return res.status(400).end();

  //   id(db에서 자동 부여되는)값 자동 채번
  IssueModel.issueCollection.create(
    {
      //   issueId,
      issueTitle,
      issueContents,
      issueHashtag,
      issueCategory,
      issueAuthor,
      issueDate,
      issueModifiedDate,
      active,
      issueViewCnt,
    },
    (err, result) => {
      if (err) return res.status(500).end();
      res.status(201).json(result);
    }
  );
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
    var milliseconds = date.getMilliseconds();
    return new Date(
      Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
    );
  }

  const issueModifiedDate = getCurrentDate();

  //id값 유효한지 확인
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  //id에 해당하는 Document에 입력받은 Data로 Update
  IssueModel.issueCollection.findByIdAndUpdate(
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
  IssueModel.issueCollection.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다!");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

//페이지 뿌리는 부분

const showCreatePage = (req, res) => {
  //   res.render("issue/create");
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  IssueModel.issueCollection.findById(id, (err, result) => {
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
  remove,
  checkId,
  showCreatePage,
  showUpdatePage,
};
