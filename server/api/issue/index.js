// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./issue.ctrl");

// 목록조회
//localhost:5000/issue/
router.get("/", ctrl.list); //메인 이슈 리스트 업

// 상세조회 - 디테일 페이지 (localhost:5000/issue/:id)
router.get("/:id", ctrl.checkId, ctrl.detail); // 이걸로 받아와야 조회수 1증가

// 등록 localhost:5000/api/issue
router.post("/", ctrl.create); // 이슈 올리기 (게시글 작성)

// 수정
router.put("/:id", ctrl.checkId, ctrl.update);

// 삭제
router.delete("/:id", ctrl.checkId, ctrl.remove);

//user ups처리
router.post("/:id/ups", ctrl.createUps); // 업 버튼 누를 때
router.delete("/:id/ups/:upId", ctrl.removeUps); // 업 버튼 취소할 때

//유저 마이페이지
router.get("/mypage/ups", ctrl.myPageUps); //ups한 이슈 리스트
router.get("/mypage/issue", ctrl.myPageIssue); //올린 issue리스트

//유저 로그인 test
//로그인 여부 확인  - 로그인 시, user Data json으로 넘어감 / 로그인 아닐 시, null
router.get("/tokenTest/test", ctrl.tokenTest);

module.exports = router;
