const { User } = require("../../model/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");

const signup = (req, res) => {
  const { name } = req.body;
  User.findOne({ name }, (err, result) => {
    if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용중인 name입니다.");

    const user = new User(req.body);
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    //DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀립니다.",
        });

      //비밀번호까지 맞다면 Token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //Token을 Cookie에 저장 (cookie-parser 이용)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
};

//=================뭔가 이상한=================
//모든 요청에 대해 token 정합성 체크
const checkAuth = (req, res, next) => {
  //모든 화면에서 공통으로 보여지는 값이 있는 경우
  res.locals.user = null;

  //쿠키에서 토큰 가져오기
  const token = req.cookies.token;

  if (!token) {
    //정상적으로 토큰이 없는 경우
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login"
    )
      return next();
    // 비정상적으로 토큰이 없는 경우
    else return res.render("user/login");
  }

  //토큰이 있는 경우
  //토큰 적합성 체크

  jwt.verify(token, "secretToken", (err, _id) => {
    if (err) {
      res.clearCookie("token");
      return res.render("user/login");
    }

    //쿠키의 token, DB에 저장된 token비교
    UserModel.findOne({ _id, token }, (err, result) => {
      if (err)
        return res.status(500).send("사용자 인증 시 오류가 발생했습니다");
      if (!result) return res.render("user/login");
      res.locals.user = { name: result.name, role: result.role };
      next();
    });
  });
};

const logout = (req, res) => {
  jwt.verify(req.cookies.x_auth, "secretToken", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다");
    User.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다");
      res.clearCookie("token");
      res.redirect("/");
    });
  });
};

module.exports = {
  signup,
  login,
  checkAuth,
  logout,
};
