var mongoose= require('mongoose');
mongoose.Promise=global.Promise
var reviewSchema=new mongoose.Schema({
    movie: String,
    review: String,
    rating: {type: Number, min:0 , max:5}
    })
    var userReview=mongoose.model("userReview", reviewSchema)
    module.exports=userReview;
    
