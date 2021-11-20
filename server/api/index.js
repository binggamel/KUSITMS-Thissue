// const express = require("express");
// const router = express.Router();

const { Router } = require("express");
const router = Router();

router.use("/issue", require("./issue"));
router.use("/user", require("./user"));

module.exports = router;
