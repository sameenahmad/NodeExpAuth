var mongoose= require('mongoose');
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });
var reviewSchema=new mongoose.Schema({
    movie: String,
    review: String,
    rating: {type: Number, min:0 , max:5}
    })
    var userReview=mongoose.model("userReview", reviewSchema)
    module.exports=userReview;
    
