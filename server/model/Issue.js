const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new mongoose.Schema({
  //이슈번호, 제목, 내용, 해시태그, 카테고리, 작성자, 작성일, 수정일, 업수, 조회수
  issueId: {
    //이슈번호
    type: String,
  },
  issueTitle: {
    //제목
    type: String,
    required: true,
    maxlength: 50,
  },
  issueContents: {
    //내용
    type: String,
    required: true,
  },
  issueHashtag: {
    //해시태그
    type: String,
  },
  issueCategory: {
    //카테고리
    type: String,
  },
  issueAuthor: {
    //작성자
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  issueModifiedDate: {
    type: Date,
  },
  ups: {
    //업한 유저
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  active: {
    //공개 비공개
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  issueViewCnt: {
    //조회수
    type: Number,
    default: 0,
    // required: true,
  },
});

module.exports = {
  issueCollection: mongoose.model("Issue", issueSchema),
};
