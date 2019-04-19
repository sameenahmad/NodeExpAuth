const express= require('express');
const bodyParser = require('body-parser');
const app = express();
var mongodb = require('mongodb');
var mongoose= require('mongoose');
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req,res)=>
{
    res.sendFile(__dirname + "/index.html")
})
app.get('/signIn', (req,res)=>{
    res.sendFile(__dirname + '/signin.html')
})
app.get('/register', (req,res)=>{
    res.sendFile(__dirname +'/register.html')
})
app.get('/review', (req,res)=>{
    res.sendFile(__dirname +'/review.html')
})
// Adds Email to Database
app.post("/addEmail", (req,res)=>{
    var myData= new User(req.body);
    myData.save()
    .then(item=>{
    res.sendFile(__dirname + '/review.html')  
    }) 
    .catch(err=>{res.status(400).send("Incorrect details")})
     });
// Schema for Registeration Form
     var dataBaseSchema=new mongoose.Schema({
        fistName: String,
        lastName: String,
        email: String,
        password:String,
        dob: Date,
    })
    var User = mongoose.model("User", dataBaseSchema);
//Schema for Movie Reviews
var reviewSchema=new mongoose.Schema({
    movie: String,
    review: String,
    rating: {type: Number, min:0 , max:5}
    })
    var userInput=mongoose.model("userInput", reviewSchema)
    app.post('/submitReview',(req,res)=>{
        var value= new userInput(req.body)
        value.save()
        .then(item=>res.send("Review Submitted Successfully"))
        .catch(err=>res.status(400).send("An error Occured. Try again"));
    });

app.listen(5000);
 
