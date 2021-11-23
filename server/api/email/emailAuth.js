const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,  //보내는 메일의 주소
        pass: process.env.NODEMAILER_PASS   //보내는 메일의 비밀번호
    }
});

module.exports = transport;