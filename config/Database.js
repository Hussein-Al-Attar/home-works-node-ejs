const db = require("mongoose");
db.set("strictQuery", false);
db
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((e) => {
    console.log("Failed to connect to the database:", e);
  });
  module.exports=db;