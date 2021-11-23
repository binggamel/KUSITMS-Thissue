const express = require("express");
const app = express();
const basic = require("./router/index");

const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./model/User");

const cors = require("cors");
app.use(cors())

//config.mongoURI
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
});

var db = mongoose.connection;
// console.log(db);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
app.use('/up', require('./router/up'));


//Sign Up
app.post('/signup', (req, res) => {
    //post로 넘어온 데이터를 DB에 저장
    const user= new User(req.body) 
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

//Login
app.post('/login', (req, res)=>{
    //요청된 이메일을 DB에서 찾음
    User.findOne({ email: req.body.email }, (err, user)=> {
        if(!user){
            return res.json({ 
                loginSuccess: false,
                message: "존재하지 않는 아이디입니다."
            })
        }
        
        //DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch)=> {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀립니다." })

            //비밀번호까지 맞다면 Token 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                //Token을 Cookie에 저장 (cookie-parser 이용)
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})


//Authentication(미들웨어를 통과함 = Authentication이 true. 인증 통과~!)
app.get('/auth', auth, (req, res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    })
})

//Logout
app.get('/logout', auth, (req, res)=> {
    User.findOneAndUpdate({ _id: req.user._id},
        {token: ""}
        ,(err, user)=> {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})

app.get("/", (req, res) => res.send("핫식스 아좌아좌빠이띵~"));

app.use("/api", require("./api"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});
