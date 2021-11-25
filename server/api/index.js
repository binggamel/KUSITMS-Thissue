// const express = require("express");
// const router = express.Router();

const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    console.log('http://localhost:5000/api/');
    res.send('디스이즈 서버에서 보내는 헬로리액트라고 제발뜨라고제발');
})

router.use("/issue", require("./issue"));
router.use("/user", require("./user"));
router.use("/ranking", require("./ranking"));
router.use("/up", require("./up/up"));
router.use("/email", require("./email/email"));

module.exports = router;
