const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Name: String,
  Phone: Number,
  Email: String,
  Password: String,
  Plan: String,
});

module.exports = mongoose.model("member", schema, "Members");
