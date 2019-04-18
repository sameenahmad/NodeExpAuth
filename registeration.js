const express= require('express');
const bodyParser = require('body-parser');
const app = express();
var mongo = require('mongodb');
var mongoose= require('mongoose');
 "mongodb://localhost:27017/db"
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/db")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + "/index.html");
 })
 app.post('/addEmail', (req,res)=>{
var myData= new User(req.body);
myData.save()
.then(item=>{ res.send("Registered Successfully")})
.catch(err=>{ res.status(400).send("Incorrect details")})
 });
 
var dataBaseSchema=new mongoose.Schema({
    fistName: String,
    lastName: String,
    email: String,
    password:String,
    dob: Date,
})
var User = mongoose.model("User", dataBaseSchema);

app.listen(8000);

