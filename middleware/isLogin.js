module.exports = (req, res, next) => {
  if (req.cookies.auth == undefined) {
    return res.render("event/login");
  }
  next();
};
