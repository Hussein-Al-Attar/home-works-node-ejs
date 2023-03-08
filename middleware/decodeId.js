const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.cookies.auth != undefined) {
    req.id = jwt.decode(req.cookies.auth)["_id"];
    
  }
  next();
};
