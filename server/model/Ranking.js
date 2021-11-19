const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
    //prev, 등락, 실제랭킹
    agingValue: {
        type: Number
    }
});

const Ranking = mongoose.model('Ranking', rankingSchema);
module.exports = { Ranking }