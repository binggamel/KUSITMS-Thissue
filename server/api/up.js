const express = require('express');
const router = express.Router();
const { Up } = require('../model/Up');

router.post('/upNumber', (req, res) => {
    //mongoDB에서 up한 숫자 가져오기
    Up.find({ "issueId": req.body.issueId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, upNumber: info.length})
        })
})


router.post('/upped', (req, res) => {
    //내가 이 이슈를 업했는지? 정보를 DB에서 가져오기
    Up.find({"issueId": req.body.issueId, "upFrom": req.body.from})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            //프론트에 숫자 정보 보냄
            let result=false;
            if(info.length!==0){
                result=true;
            }

            res.status(200).json({success: true, upped: result});
        })
})


router.post('/removeFromUp', (req, res) => {
    Up.findOneAndDelete({ issueId: req.body.issueId, upFrom: req.body.upFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, doc});
        })
})


router.post('/addToUp', (req, res) => {
    const up=new Up(req.body);
    
    up.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true});
    })
})

//Up한 이슈들의 리스트 정보 가져오기
router.post('/getUppedIssue', (req, res) => {
    Up.find({ 'upFrom': req.body.upFrom})
        .exec((err, ups) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, ups});
        })
})


//Up 리스트에서 삭제하기
router.post('/removeFromUp', (req, res) => {
    Up.findOneAndDelete({ issueId: req.body.issueId, upFrom: req.body.upFrom })
        .exec((err, result) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true});
        })
})

module.exports = router;