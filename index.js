const express = require("express");
var cookieParser = require("cookie-parser");
const post = require("./router/post");
const User = require("./router/user");
const profile = require("./router/profile");
const loginOut = require("./router/loginOut");
const search = require("./router/search");
const decodeId = require("./middleware/decodeId");
const isLogin = require("./middleware/isLogin");
require("./config/Database");
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(decodeId);
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use("/img", express.static("img"));
app.use("/profile/", profile);
app.use("/post/", post);
app.use("/user/", User);
app.use("/loginOut/", loginOut);
app.use("/search/", search);
app.get("/",isLogin, function (req, res) {
  console.log("home")
  return res.render("event/home");
});
app.all("*", function (req, res) {
  res.status(404).json({ status: "false", Message: "page not found main" });
});
var port = process.env.port || 3001;
app.listen(port, () => console.log("app work on port " + port + "..."));
