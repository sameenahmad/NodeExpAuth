const express = require("express");
const userModel = require("./userModel");
const reviewModel = require("./reviewModel");
const htmlRouter = require("../clientSide/htmlRouter.js");
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const app = express();
mongoose.Promise=global.Promise
var db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });
const adminRouter = express.Router();

//Registers User to DataBase
adminRouter.post('/register', (req, res) => { 
  /*db.User.findOne({ email: email}).then(user => {
    if (user) 
    {res.send("User already exists")
    res.redirect('/register')}
    if (password != password2);
    throw err;
  });
*/  //Hashing Password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      password = hash;
    });
  });
  var myData = new User({ name, email, password });
  myData.save();
  //res.redirect("/signin");
});

//Log-in User
adminRouter.get('/signin', (req, res) => {
  let { email } = req.body;
  const { password } = req.body;
  db.User.findOne({ email: email }).then(User => {
    if (!User) {

      return res.status(404).json({ email: "User not found" });
    }
    //comparing Hashed Passwords
    bcrypt.compare(password, User.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: User.id, name: User.name };
        jwt.sign(payload, config.secret, (err, token) => {
          res.json({ token });
        });
      } else return res.status(400).json({ message: "Password Incorrect" });
    });
  });
 // return res.redirect('/review')
});

//Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.header["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
}

adminRouter.post('/submitReview', (req, res) => {
  const { movie, review, rating } = req.body;
  if (rating > 5) res.json({ message: "Please rate between 0-5" });
  var userInput = new userReview(movie, review, rating);
  userInput.save();
});
app.use('/api', adminRouter);

module.exports = adminRouter;
