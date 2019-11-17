// ROUTER SETUP
const express = require("express");
const signin = express.Router();

// SINGIN PAGE
signin.get("/", (req, res) => {
  res.render("signin/signin.ejs", {
    currentUser: req.session.currentUser
  });
});

// EXPORT ROUTER
module.exports = signin;
