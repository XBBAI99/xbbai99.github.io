// SERVER SETUP
const express = require("express"); // USE EXPRESS FOR SERVER, ROUTES, RESTFUL APIS
const app = express(); // SHORTHAND FOR EXPRESS
require("dotenv").config(); // SET ENVIRONMENT VARIABLES

// CONFIGURATION SETUP
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// MIDDLEWARE SETUP
const methodOverride = require("method-override"); // MIDDLEWARE FOR FORM TO PERFORM POST AND DELETE FUNCTIONS
app.use(methodOverride("_method")); // LOOK FOR "_METHOD" AND OVERRIDE

app.use(express.urlencoded({ extended: false })); // USE BODY PARSER TO PERFORM POST AND PUT FUNCTION
app.use(express.static("public")); // USE STATIC CSS

const session = require("express-session"); // USE SESSION
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false
  })
);

const bcrypt = require("bcrypt");

app.use((req, res, next) => {
  // MONITOR CLIENT ACTION AND SEND ALERT
  console.log("client is doing something");
  next();
});

// DATABASE SETUP
const mongoose = require("mongoose"); // USE MONGOOSE TO MANAGE MONGODB
mongoose.connect(
  // CONNECT TO MONGODB
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("the connection with mongod is established");
  }
);
const db = mongoose.connection; // SHORTHAND FOR MONGOOSE

db.on("error", err => console.log(err.message + " is mongod not running?")); // ALERT MESSAGE IS MONGODB HAS CONNECTION ERROR
db.on("connected", () => console.log("mongo connected: ", mongoURI)); // ALERT MESSAGE IS MONGODB IS CONNECTED WELL
db.on("disconnected", () => console.log("mongo disconnected")); // ALERT MESSAGE IS MONGODB IS DISCONNECTED

// SET UP CONTROLLER
const centresController = require("./controllers/centresController.js"); //IMPORT ROUTER IN CONTROLLER FILE
app.use("/raffleskidz/centres", centresController); // ALWAYS USE ROUTER ON "/CENTRES" ROUTE

const signinController = require("./controllers/signinController.js"); //IMPORT ROUTER IN CONTROLLER FILE
app.use("/signin", signinController); // ALWAYS USE ROUTER ON "/SIGNIN" ROUTE

const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessionsController.js");
app.use("/sessions", sessionsController);

// PORT LISTENER
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
