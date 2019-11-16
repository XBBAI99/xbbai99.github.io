// ROUTER SETUP
const express = require("express");
const login = express.Router();

// LINK WITH PRODUCT MODEL
// const Centre = require("../models/centre/centre");
// const newCentres = require("../models/centre/seed_centre");

// SEED DATA
// Centre.insertMany(newCentres, (error, centres) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(centres);
//   }
// });

// 1. LOGIN PAGE
login.get("/", (req, res) => {
  res.render("login/login.ejs", {
    currentUser: req.session.currentUser
  });
});

// EXPORT ROUTER
module.exports = login;
