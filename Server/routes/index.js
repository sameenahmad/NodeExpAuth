const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const config = require("../config");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const saltrounds = 10;

// Registers User to DataBase
adminRouter.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  User.findOne({ email }, (err, obj) => {
    if (err) return res.status(200).json({ err });

    // Already a user with this email
    if (obj) return res.status(200).json({ message: "User already exists" }); //exit the loop if user already exists. It is saving the existing user again
    if (password != password2) {
      return res.status(200).json({ message: "Password doesn't Match" });
    }
    //Hashing Password
    bcrypt.hash(password, saltrounds, (err, hash) => {
      const hashedPassword = hash;

      var myData = new User({
        name,
        email,
        password: hashedPassword
      });
      myData.save((err, savedUser) => {
        if (err) return res.status(500).json({ err });
        else {
          res.status(200).json({ success: true });
          console.log(myData);
        }
      });
    });
  });
});

// res.redirect("/signin");
//Log-in User
adminRouter.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email }, (err, obj) => {
    if (err) return res.status(500).json({ err });
    if (!obj) return res.status(404).json({ message: "User not found" });

    console.log(obj.password);
    bcrypt
      .compare(req.body.password, obj.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = { id: this.id, name: this.name };
          jwt.sign(payload, config.secret, (err, token) => {
            res.json({ auth: true, token: token });
          });
        }
        else res.json({message:"User not found"})
      })
      .catch((err)=>{
        res.status(400).json({ token: null, auth: false, err});
      });
  });
});

// return res.redirect('/review')

adminRouter.post("/submitReview", (req, res) => {
  const { movie, review, rating } = req.body;
  if (rating > 5) res.json({ message: "Please rate between 0-5" });
  var userInput = new userReview(movie, review, rating);
  userInput.save();
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

module.exports = adminRouter;
