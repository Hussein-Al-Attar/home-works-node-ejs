const express = require("express");
const Router = express.Router();
const { User } = require("../models/user");
const { Post } = require("../models/post");
Router.get("/", async (req, res) => {
  try {
    console.log(req.body.id)
    const user = await User.findById(req.id);
    const posts = await Post.find({userId:req.id});
    console.log(posts)
    return res.render("event/profile", { user: user,posts:posts,admin:true });
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.get("/editProfile", async (req, res) => {
  try {
    const user = await User.findById(req.id);
    return res.render("event/editProfile", { user: user,posts:[]});
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.post("/editProfile", async (req, res) => {
  try {
    console.log(req.id,"id")
    const user = await User.findByIdAndUpdate(req.id, {
      phone: req.body.phone,
      location: req.body.location,
      username: req.body.username,
      TypeS: req.body.TypeS,
      des: req.body.descption,
    });
    res.render("event/profile",{user:user,posts:[],admin:true})
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});

Router.all("*", function (req, res) {
  res.status(404).json({ status: "false", Message: "page not found post" });
});
module.exports = Router;
