// USERS ROUTER SETUP
const express = require("express");
const users = express.Router();

// LINK WITH USER MODEL
const User = require("../models/user/user");

// NEW USER SIGNUP PAGE
users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// POST NEW USER
users.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect("/login");
  });
});

// EXPORT USERS ROUTER
module.exports = users;
