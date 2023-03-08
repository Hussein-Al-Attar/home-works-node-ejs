const express = require("express");
const decodeId = require("../middleware/decodeId");
const uploadImg = require("../middleware/uploadImg");
const Router = express.Router();
const { Post } = require("../models/post");
Router.post("/", uploadImg, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      des: req.body.descption,
      userId: req.id,
      imgPath: "/img/uploads/" + req.file.filename,
    });
    const result = await post.save();
    return res.redirect("/");
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.get("/delet/:id", async (req, res) => {
  try {
    console.log("delet");
    await Post.findByIdAndDelete(req.id);
    return res.redirect("/post/");
  } catch (e) {
    console.log("user post error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId");
    res.render("event/posts", { posts: posts });
  } catch (e) {
    console.log("user get/ error :" + e);
    res.send({ msg: "wrong try agin" });
  }
});
Router.get("/createPost", function (req, res) {
  res.render("event/createPost");
});
Router.all("*", function (req, res) {
  res.status(404).json({ status: "false", Message: "page not found post" });
});
module.exports = Router;
