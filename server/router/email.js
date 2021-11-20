const express = require('express');
const router = express.Router();
const mailer = require('nodemailer');

router.get('/auth/mail', (req, res) => {
    const { email }  = req.body;
    let emailParam = {
      toEmail: 'thisisme20@daum.net',   //수신할 이메일
      subject: '메일제목',  //메일 제목
      text: '잘보내졌니'    //메일 내용
    };

    mailer.sendGmail(emailParam);
    res.status(200).send("성공");
})

module.exports = router;