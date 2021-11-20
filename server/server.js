const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// const basic = require("./router/index");

const mongoose = require("mongoose");
require("dotenv").config();
const { auth } = require("./middleware/auth");
const { User } = require("./model/User");
const config = require("./config/key");

//config.mongoURI
// process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/up", require("./router/up"));

//Authentication(미들웨어를 통과함 = Authentication이 true. 인증 통과~!)
// app.get("/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//   });
// });

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
