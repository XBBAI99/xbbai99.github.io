// USERS ROUTER SETUP
const express = require("express");
const users = express.Router();

// PASSWORD ENCRYPTION
const bcrypt = require("bcrypt");

// LINK WITH USER MODEL
const User = require("../models/user/user");

// NEW USER SIGNUP PAGE
users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// POST NEW USER
users.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect("/sessions/new");
  });
});

// EXPORT USERS ROUTER
module.exports = users;
