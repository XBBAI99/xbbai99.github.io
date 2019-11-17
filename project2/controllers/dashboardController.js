// ROUTER SETUP
const express = require("express");
const dashboard = express.Router();

// SINGIN PAGE
dashboard.get("/", (req, res) => {
  res.render("dashboard/dashboard.ejs", {
    currentUser: req.session.currentUser
  });
});

// EXPORT ROUTER
module.exports = dashboard;
