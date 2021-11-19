const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Issue } = require('../model/Issue'); 

const upSchema = new mongoose.Schema({
    upFrom: { //누가 이 이슈를 업!했는가
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    issueId: {
        type: String
    }

}, {timestamps: true});

const Up = mongoose.model('Up', upSchema);
module.exports = { Up }