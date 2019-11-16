// SERVER SETUP
const express = require("express"); // USE EXPRESS FOR SERVER, ROUTES, RESTFUL APIS
const app = express(); // SHORTHAND FOR EXPRESS
const port = 3000; // SET A PORT ON LOCAL HOST

// MIDDLEWARE SETUP
const methodOverride = require("method-override"); // MIDDLEWARE FOR FORM TO PERFORM POST AND DELETE FUNCTIONS
app.use(methodOverride("_method")); // LOOK FOR "_METHOD" AND OVERRIDE

app.use(express.urlencoded({ extended: false })); // USE BODY PARSER TO PERFORM POST AND PUT FUNCTION
app.use(express.static("public")); // USE STATIC CSS

const session = require("express-session"); // USE SESSION

app.use((req, res, next) => {
  // MONITOR CLIENT ACTION AND SEND ALERT
  console.log("client is doing something");
  next();
});

// DATABASE SETUP
const mongoose = require("mongoose"); // USE MONGOOSE TO MANAGE MONGODB
const mongoURI = "mongodb://localhost:27017/" + "raffleskidz"; // SET URI TO CONNECT WITH MONGODB, SUB-DATABASE NAMED "PRODUCTS"
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
app.use("/raffleskidz/centres", centresController); // ALWAYS USE ROUTER ON "/PRODUCTS" ROUTE

// PORT LISTENER
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
