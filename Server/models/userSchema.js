var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: "" },
  email: { type: String, trim: true, unique: true, default: "" },
  password: { type: String, trim: true, default: "" }
});

module.exports = userSchema;
