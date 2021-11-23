const express = require('express');
const router = express.Router();
const transport = require('./emailAuth');

router.post('/emailAuth', (req, res, next) => {
    const { email }  = req.body;
    transport.sendMail({
      from: `"Thissue" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: '[Thissue] 인증번호가 도착했습니다.',
      html: `
        <div style="text-align: center;">
          <h3 style="color: #FA5882">아래 링크로 이동해 회원가입을 진행해주세요!</h3>
          <br />
          <p>"http://localhost:5000/api/user/signup"</p>
        </div>
      `})
      .then(send => res.json(send))
      .catch(err => next(err))
})

module.exports = router;