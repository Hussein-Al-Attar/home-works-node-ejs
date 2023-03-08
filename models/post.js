const Joi = require("joi");
const mongoose = require("mongoose");
const User=require("./user")
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  des: {
    type: String,
    min: [8, "Too few eggs"],
    max: 1024,
  },
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  imgPath: { type: String },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("post", postSchema);
function postValidate(req, res) {
  const schema = Joi.object({
    title: Joi.string().max(256).min(3).required(),
    des: Joi.string().max(1024).min(8).required(),
  });
  schema.validate(req.body);
  const { error } = schema.validate(req.body);
  return error.details[0].message;
}
exports.Post = Post;

exports.postValidate = postValidate;
