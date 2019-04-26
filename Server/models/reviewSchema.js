var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  movie: String,
  review: String,
  rating: { type: Number, min: 0, max: 5 }
});

module.exports = reviewSchema;
