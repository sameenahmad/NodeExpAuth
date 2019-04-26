const mongoose = require("mongoose");

/**
 * Models
 */

const userSchema = require("../models/userSchema");
const reviewSchema = require("../models/reviewSchema");

mongoose.model("user", userSchema);
mongoose.model("review", reviewSchema);

mongoose.connect("mongodb://localhost:27017/db", {
  useNewUrlParser: true
});
