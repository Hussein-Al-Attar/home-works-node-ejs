const express = require("express");
const Router = express.Router();
Router.get("/", async (req, res) => {
  req.cookies.auth=null;
  req.id=null;
  res.render("event/login")
});

module.exports = Router;
