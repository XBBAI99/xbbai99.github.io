// SESSIONS ROUTER SETUP
const express = require("express");
const sessions = express.Router();

// LINK WITH USER MODEL
const User = require("../models/user/user");

// USER LOGIN
sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// POST USER LOGIN
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // if db error handle the db error
    if (err) {
      console.log(err);
      res.send("oops something went wrong");
      // if user not found, handle the error
    } else if (!foundUser) {
      res.send("user not found!");
    } else {
      if (req.body.password == foundUser.password) {
        req.session.currentUser = foundUser;
        res.redirect("/login");
        // if passwords don't match, handle the error
      } else {
        res.send('<a href="/">wrong password</a>');
      }
    }
  });
});

// EXPORT SESSIONS ROUTER
module.exports = sessions;
