const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//전송 옵션 설정하기
let transporter = nodemailer.createTransport({
    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
    service: 'gmail',
    // host를 gmail로 설정
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력
        user: process.env.NODEMAILER_USER,
      // Gmail 패스워드 입력
        pass: process.env.NODEMAILER_PASS,
    },
});

//메일 전송하기
let info = await transporter.sendMail({
    // 보내는 곳의 이름과, 메일 주소를 입력
    from: `"WDMA Team" <${process.env.NODEMAILER_USER}>`,
    // 받는 곳의 메일 주소를 입력
    to: email,
    // 보내는 메일의 제목을 입력
    subject: 'WDMA Auth Number',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // html: html로 작성된 내용
    text: generatedAuthNumber,
    html: `<b>${generatedAuthNumber}</b>`,
});

//샘플
const main = async () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"WDMA Team" <${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: 'WDMA Auth Number',
        text: generatedAuthNumber,
        html: `<b>${generatedAuthNumber}</b>`,
    });
    
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        res.status(200).json({
            status: 'Success',
            code: 200,
            message: 'Sent Auth Email',
        });
    };

    router.post('/auth/email', (req, res) => {
        //
    })
    
    main().catch(console.error);