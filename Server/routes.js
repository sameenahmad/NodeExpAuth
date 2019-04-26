const express = require("express");
const userModel = require("./userModel");
const reviewModel = require("./reviewModel");
const htmlRouter = require("../clientSide/htmlRouter.js");
const dbConnect = require("./dbConnect");
var bcrypt = require("bcryptjs");
const app = express();
const mongoose=require('mongoose');
const adminRouter = express.Router();
//Registers User to DataBase
adminRouter.post("/register", (req, res) => {
  const{name,email,password,password2}  = req.body;
 // User.findOne({ email: email }, (err, obj) => {
    //if (err) return res.status(200).send(err);
    //if (email!=undefined)
    //return res.status(200).send("User already exist");
 // });
  //if (password != password2);
  //res.send("Password Inocorrect");
  //Hashing Password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw(err);
      password = hash;
    });
  });
  var myData = new User({name, email, password});
  myData.save((err,savedUser)=>
  {
 if(err) return res.status(500).send();
 else res.status(200).send();

  })
  // res.redirect("/signin");
});

//Log-in User
adminRouter.get("/signin", (req, res) => {
  User.findOne({ email: email }, function(err, obj) {
    {
      if (obj == undefined)
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

adminRouter.post("/submitReview", (req, res) => {
  const { movie, review, rating } = req.body;
  if (rating > 5) res.json({ message: "Please rate between 0-5" });
  var userInput = new userReview(movie, review, rating);
  userInput.save();
});
app.use("/api", adminRouter);

module.exports = adminRouter;
