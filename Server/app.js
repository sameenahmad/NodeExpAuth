/**
 * Modules
 */

console.debug("$> Initializing Modules! :tada:");

const express = require("express");
const bodyParser = require("body-parser");

console.debug("$> Modules successfully initialized ! :tada:");

/**
 * Database
 */

console.debug("$> Initializing Database! :tada:");

require("./db/database");

console.debug("$> Database successfully initialized ! :tada:");

/**
 * Routes
 */

console.debug("$> Initializing Routes! :tada:");

var adminRouter = require("./routes");
const htmlRouter = require("../clientSide/htmlRouter");

console.debug("$> Routes successfully initialized ! :tada:");

/**
 * App Config
 */

console.debug("$> Initializing ExpressApp! :tada:");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", adminRouter);
app.use("/", htmlRouter);

// Let's roll!
app.listen(port, ()=> console.log("Server listening on port 8000"));

console.debug("$> ExpressApp successfully initialized ! :tada:");
