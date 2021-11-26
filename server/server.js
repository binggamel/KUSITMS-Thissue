const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
require("dotenv").config();
const { User } = require("./model/User");
const path = require("path");

const cors = require("cors");
app.use(cors());

//MONGO_URL=mongodb://localhost/thissue
//MONGO_URL=mongodb+srv://root:root1234@thissue.oomvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const FUXX = "mongodb://localhost/thissue";
// "mongodb+srv://root:root1234@thissue.oomvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

console.log(process.env.MONGO_URL); //undefined
mongoose
  .connect(FUXX, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.log("DB Connection Error: " + e.message);
  });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
