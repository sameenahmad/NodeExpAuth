const express = require("express");
const app = express();
const model_user = require("model_user.js");
const model_reviews = require("model_reviews.js");
app.get("/", (req, res) => {
  return res.sendFile(__dirname + "../client Side/index.html");
});

app.get("/signIn", (req, res) => {
  return res.sendFile(__dirname + "../client Side/signIn.html");
});

app.get("/register", (req, res) => {
  return res.sendFile(__dirname + "../client Side/register.html");
});

app.get("/review", (req, res) => {
  return res.sendFile(__dirname + "../client Side/review.html");
});

//Registers User to DataBase
app.post("/api/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let search = db.User.findOne({ email: email });
  if (search != null) res.send("User already exists");

  let errors = [];
  if (password != password2) {
    errors.push({ msg: "Passwords don't match" });
  }
  if (password.length < 6) {
    errors.push({
      message: "Password length should be at least 6 characters "
    });
  }
  var hashedPassword = bcrypt.hashSync(password, 8);
  var myData = new User(name, email, hashedPassword);
  myData.save();
});

//Log-in User
app.get("/api/signin", (req, res) => {
  let userEmail = req.body.email;
  var Password = bcrypt.hashSync(req.body.password, 8);
  let search = db.User.findOne(
    { email: userEmail },
    { hashedPassword: Password }
  );
  if (search != null) {
    var token = jwt.sign({ userEmail }, config.secret, (err, token) => {
      if (err) res.status(405).send("Authorization Failed");
      else res.json({ token });
    });
  }
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

app.post("/api/submitReview", verifyToken, (req, res) => {
  const { movie, review, rating } = req.body;
  let errors = [];
  if (rating > 5) errors.push({ message: "Please rate between 0-5" });
  var userInput = new userReview(movie, review, rating);
  userInput.save();
});
