// 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./ranking.ctrl");

// 목록조회
//localhost:5000/ranking/
router.get("/", ctrl.list);

// 수정
router.post("/", ctrl.update);

// // 삭제
// router.delete("/:id", ctrl.checkId, ctrl.remove);

module.exports = router;
