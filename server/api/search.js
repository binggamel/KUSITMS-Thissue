const express = require("express");
const router = express.Router();
const { Issue } = require("../model/Issue");

router.get("/:keyword", async (req, res) => {
  var keyword = req.params.keyword;
  console.log(keyword);
  let result = await Issue.find({ issueTitle: { $regex: req.params.keyword } });

  return res.status(200).json(result);
});

// router.get("/hashtag/:keyword", async (req, res) => {
//   var keyword = req.params.keyword;
//   console.log(keyword);
//   let result = await Issue.find({
//     IssueHashtag: { hashtag: { $regex: req.params.keyword } },
//   });
//   console.log(result);
//   return res.status(200).json(result);
// });

module.exports = router;
