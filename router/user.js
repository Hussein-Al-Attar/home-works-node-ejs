const express = require("express");
const Router = express.Router();
const { userValidate, User } = require("../models/user");
const bcrypt = require("bcrypt");
Router.post("/sign", async (req, res) => {
  try {
    userValidate(req, res);
    const re = await User.find({ email: req.body.email });
    if (re.length > 0) {
      return res.render("event/sign", { error: "user in database" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({ email: req.body.email, password: password });
    const result = await user.save();
    res.cookie("auth", result.generateToken());
    return res.render("event/home");
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.post("/login", async (req, res) => {
  try {
    const re = await User.find({ email: req.body.email });
    if (re.length == 0) {
      return res.render("event/login", { error: "Invald possword or email" });
    }
    bcrypt.compare(req.body.password, re[0].password, function (err, result) {
      if (result == true) {
        res.cookie("auth", re[0].generateToken());
        return res.render("event/home");
      } else {
        return res.render("event/login", { error: "Invald possword or email" });
      }
    });
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.get("/sign", async (req, res) => {
  return res.render("event/sign");
});
Router.get("/login", async (req, res) => {
  return res.render("event/login");
});
Router.all("*", function (req, res) {
  res.status(404).json({ status: "false", Message: "page not found" });
});
module.exports = Router;
