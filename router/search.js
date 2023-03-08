const express = require("express");
const { Post } = require("../models/post");
const { User } = require("../models/user");
const Router = express.Router();
Router.get("/all/", async (req, res) => {
    let users;
if (req.query.st=="ts") {
    users= await User.find({TypeS:req.query.s});
}else{
    users = await User.find({username:req.query.s});
}
 
  res.render("event/search", { users: users});
});
Router.get("/", async (req, res) => {
  const users = await User.find();
  res.render("event/search", { users: users });
});

module.exports = Router;
