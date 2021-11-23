const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
require("dotenv").config();
const { auth } = require("./middleware/auth");
const { User } = require("./model/User");
const config = require("./config/key");
const path = require('path');

//MONGO_URL=mongodb://localhost/thissue
//MONGO_URL=mongodb+srv://root:root1234@thissue.oomvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
