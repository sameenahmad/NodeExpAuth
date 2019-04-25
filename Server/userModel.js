var mongoose= require('mongoose');
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });
var db = mongoose.connection;
var dataBaseSchema=new mongoose.Schema({
    Name: String,
    email: String,
    password:String,
})
var User = mongoose.model("User", dataBaseSchema);
module.exports=User;
