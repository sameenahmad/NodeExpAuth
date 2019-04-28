const express = require("express");
const bcrypt = require("bcryptjs");

const adminRouter = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("user");

// Registers User to DataBase
adminRouter.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  User.findOne({ email }, (err, obj) => {
    console.log("TCL: obj", obj);
    if (err) return res.status(200).json({ err });

    // Already a user with this email
    if (obj) return res.status(200).json({ message: "User already exists" });
    if (password != password2) {
      return res.send("Password Inocorrect");
    }

    //Hashing Password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ err });
        let hashedPassword = hash;

        var myData = new User({
          name,
          email,
          password: hashedPassword
        });
        myData.save((err, savedUser) => {
          if (err) return res.status(500).json({ err });
          else res.status(200).json({ success: true });
        });
      });
    });
  });

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
