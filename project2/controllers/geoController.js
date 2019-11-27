// ROUTER SETUP
const express = require("express");
const geocode = express.Router();

// CONFIGURATION SETUP
const googleURL = process.env.GOOGLE_API;

// REQUEST SETUP
const request = require("request");

// GEOCODE PAGE
geocode.get("/", (req, res) => {
  console.log("targetCentre's address is " + JSON.stringify(req.query.address)); // targetCentre's address in string format when client calls geocode route
  request(googleURL + req.query.address, function(error, response, body) {
    console.log("error:", error); // print the error if one occurrs
    console.log("statusCode:", response && response.statusCode); // print the response status code if a response is received
    console.log("Google data sent to client: " + body);
    res.json(JSON.parse(body)); // convert google data from json string into json object and send back to client
  });
});

// EXPORT ROUTER
module.exports = geocode;
