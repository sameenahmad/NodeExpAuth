var express=require('express');
var bodyParser=require('body-parser');
var Mongodb=require('mongodb')
var mongoose=require('mongoose')
var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/db", {useNewUrlParser:true});
 var reviewSchema=new mongoose.Schema({
movie: String,
review: String,
rating: {type: Number, min:0 , max:5}
})
var userInput=mongoose.model("userInput", reviewSchema)
app.get('/', (req,res)=>{
    res.sendFile(__dirname +"/review.html")
})
app.post('/submitReview',(req,res)=>{
    var value= new userInput(req.body)
    value.save()
    .then(item=>res.send("review Submitted Successfully"))
    .catch(err=>res.status(400).send("An error Occured. Try again"));
});
app.listen(8000);
