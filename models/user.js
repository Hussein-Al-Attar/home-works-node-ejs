const Joi = require("joi");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const { number } = require("joi");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {
    type: String,
    min: [8, "Too few eggs"],
    max: 1024,
  },
  phone: { type: Number },
  location: { type: String },
  username: { type: String },
  TypeS: { type: String },
  des: { type: String },
  date: { type: Date, default: Date.now },
});
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, "privateKey");
};
const User = mongoose.model("User", userSchema);
function userValidate(req, res) {
  const schema = Joi.object({
    email: Joi.string().max(256).min(3).required().email(),
    password: Joi.string().max(256).min(8).required(),
  });
  schema.validate(req.body);
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);
}
exports.User = User;

exports.userValidate = userValidate;
