const { Issue } = require("../../model/Issue");
const { RankingIssue } = require("../../model/Ranking");
const { Ranking } = require("../../model/Ranking");

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
  const listResult = Issue.find((err, result) => {
    if (err) return res.status(500).end();
    const ranking = result; // 조회수 순으로 정렬한 issue 값
    // const rank2 = [];
    const rank2 = ranking.map(({ id }, index) => {
      // issueCategory = index + 1;
      var rank = index + 1;

      return { id, rank };
    });
    // console.log(" 랭킹 순위 입력 값 : ");
    console.log(rank2);
    console.log(rank2[0].id);
    var test = rank2[0].rank;
    console.log(" test : " + test);
    RankingIssue.findByIdAndUpdate(
      rank2[0].id,
      { test },
      { new: true },
      (err, result) => {
        console.log("result");
        console.log(result);
        if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
        if (!result) return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
        // res.json(result);
        // console.log(result);
      }
    );

    /* 
    for (var i = 0; i < 50; i++) {
      console.log("rank test : " + rank2[i].rank);
      var rankrank = rank2[i].rank;

      if (rank2[i].rank == "") {
        console.log("out");
        break;
      }
      // const rank = rank2[i].rank;
      console.log("rank : " + rankrank);
      RankingIssue.findByIdAndUpdate(
        rank2[i].id,
        { rankrank },
        { new: true },
        (err, result) => {
          console.log("result");
          console.log(result);
          if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
          if (!result)
            return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
          // res.json(result);
          // console.log(result);
        }
      );
    }
    */

    /*
    let i = 0;
    while (1) {
      const rank = rank2[i].rank;
      console.log(rank);
      RankingIssue.findByIdAndUpdate(
        rank2[i].id,
        { rank },
        { new: true },
        (err, result) => {
          console.log("result");
          console.log(result);
          if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
          if (!result)
            return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
          // res.json(result);
          // console.log(result);
        }
      );
      console.log(i);
      i++;
      // i = i + 1;
      if (rank2[i].rank == "3") {
        console.log("out");
        break;
      }
    }
    */
  })
    .sort({ issueViewCnt: -1 })
    .limit(50);
  //배열.map((요소, 인덱스, 배열) => { return 요소 });

  //list: articles.map(({id}, index)=>({rank: index+1, id}))

  // console.log(listResult);
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
    active,
  } = req.body;

  //   const _id = result.id;
  //   const author = result.name;
  //   const issueAuthor = { _id, author };

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
      issueDate,
      issueModifiedDate,
      active,
    },
    (err, result) => {
      if (err) return res.status(500).end();
      res.status(201).json(result);
    }
  );
};

const update = (req, res) => {
  const listResult = Issue.find((err, result) => {
    if (err) return res.status(500).end();
    const ranking = result; // 조회수 순으로 정렬한 issue 값
    // const rank2 = [];
    const rank2 = ranking.map(({ id }, index) => {
      // issueCategory = index + 1;
      var rank = index + 1;

      return { id, rank };
    });
    // console.log(" 랭킹 순위 입력 값 : ");
    console.log(rank2);
    console.log(rank2[0].id);
    var test = rank2[0].rank;
    console.log(" test : " + test);
    RankingIssue.findByIdAndUpdate(
      rank2[0].id,
      { test },
      { new: true },
      (err, result) => {
        console.log("result");
        console.log(result);
        if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
        if (!result) return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
        // res.json(result);
        // console.log(result);
      }
    );

    /* 
    for (var i = 0; i < 50; i++) {
      console.log("rank test : " + rank2[i].rank);
      var rankrank = rank2[i].rank;

      if (rank2[i].rank == "") {
        console.log("out");
        break;
      }
      // const rank = rank2[i].rank;
      console.log("rank : " + rankrank);
      RankingIssue.findByIdAndUpdate(
        rank2[i].id,
        { rankrank },
        { new: true },
        (err, result) => {
          console.log("result");
          console.log(result);
          if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
          if (!result)
            return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
          // res.json(result);
          // console.log(result);
        }
      );
    }
    */

    /*
    let i = 0;
    while (1) {
      const rank = rank2[i].rank;
      console.log(rank);
      RankingIssue.findByIdAndUpdate(
        rank2[i].id,
        { rank },
        { new: true },
        (err, result) => {
          console.log("result");
          console.log(result);
          if (err) return res.status(500).send("랭킹 업데이트중 오류발생!");
          if (!result)
            return res.status(404).end("랭킹 업데이트 해당 이슈 없음");
          // res.json(result);
          // console.log(result);
        }
      );
      console.log(i);
      i++;
      // i = i + 1;
      if (rank2[i].rank == "3") {
        console.log("out");
        break;
      }
    }
    */
  })
    .sort({ issueViewCnt: -1 })
    .limit(50);
};

module.exports = {
  list,
  create,
  update,
  checkId,
};
