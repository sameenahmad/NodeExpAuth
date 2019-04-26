var mongoose= require('mongoose');
mongoose.Promise=global.Promise
var userSchema=new mongoose.Schema({
    name: {type:String, trim:true, default:''},
    email: {type:String, trim:true, unique: true,default:''},
    password:{type:String,trim:true , default:''}
}) 
var User = mongoose.model("User", userSchema); 
module.exports= User;
