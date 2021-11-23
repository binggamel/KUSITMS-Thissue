const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectID;
// import { ObjectID } from "bson";

const rankingIssueSchema = new mongoose.Schema({
  id: { type: Schema.Types.ObjectId, ref: "Issue" },
  rank: {
    type: Number,
    require: true,
    default: 0,
  },
  preRank: {
    type: Number,
    require: true,
    default: 0,
  },
});

const rankingSchema = new mongoose.Schema({
  list: { type: [rankingIssueSchema], required: true },
  Date: { type: Date, required: true },
});

const Ranking = mongoose.model("Ranking", rankingSchema);
const RankingIssue = mongoose.model("RankingIssue", rankingIssueSchema);

module.exports = { Ranking };
module.exports = { RankingIssue };
