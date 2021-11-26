// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./issue.ctrl");

// 목록조회
//localhost:5000/issue/
router.get("/", ctrl.list);

// 상세조회 (localhost:5000/issue/:id)
router.get("/:id", ctrl.checkId, ctrl.detail);

//수정페이지
router.get("/:id/edit", ctrl.checkId);

// 등록 localhost:5000/api/issue
router.post("/", ctrl.create);

// 수정
router.put("/:id", ctrl.checkId, ctrl.update);

// 삭제
router.delete("/:id", ctrl.checkId, ctrl.remove);

//user ups처리
router.post("/:id/ups", ctrl.createUps);
router.delete("/:id/ups/:upId", ctrl.removeUps);

//유저 마이페이지
router.get("/mypage/ups", ctrl.myPageUps); //ups한 이슈 리스트
router.get("/mypage/issue", ctrl.myPageIssue); //올린 issue리스트

//유저 로그인 test
router.get("/tokenTest/test", ctrl.tokenTest);

module.exports = router;
