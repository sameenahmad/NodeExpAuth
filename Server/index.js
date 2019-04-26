const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
var config = require("./config.js");
var bcrypt = require("bcryptjs");
var userModel = require("./userModel");
var reviewModel = require("./reviewModel");
var adminRouter = require("./routes");
const htmlRouter = require("./../clientSide/htmlRouter");
const dbConnect= require('./dbConnect')
mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;
app.use('/api', adminRouter);
app.use('/', htmlRouter);
app.listen(port);
