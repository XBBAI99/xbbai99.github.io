// ROUTER SETUP
const express = require("express");
const centres = express.Router();

// LINK WITH CENTRE MODEL
const Centre = require("../models/centre/centre");
const newCentres = require("../models/centre/seed_centre");

// SEED DATA
centres.get("/seed", (req, res) => {
  Centre.insertMany(newCentres, (error, centres) => {
    if (error) {
      console.log(error);
    } else {
      console.log(centres);
      res.send(centres);
    }
  });
});

// 1. INDEX PAGE
centres.get("/", (req, res) => {
  if (req.session.currentUser) {
    Centre.find({}, (error, allCentres) => {
      res.render("centres/index.ejs", {
        centres: allCentres
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// 2. NEW CENTRE PAGE
centres.get("/new", (req, res) => {
  res.render("centres/new.ejs");
});

// 3. SHOW PAGE
centres.get("/:id", (req, res) => {
  Centre.findById(req.params.id, (err, foundCentre) => {
    res.render("centres/show.ejs", {
      centre: foundCentre
    });
  });
});

// 4. POST NEW CENTRE
centres.post("/", (req, res) => {
  Centre.create(req.body, (error, createdCentre) => {
    res.redirect("/raffleskidz/centres");
  });
});

// 5. EDIT PAGE
centres.get("/:id/edit", (req, res) => {
  Centre.findById(req.params.id, (err, foundCentre) => {
    res.render("centres/edit.ejs", {
      centre: foundCentre
    });
  });
});

// 6. PUT
centres.put("/:id", (req, res) => {
  Centre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      res.redirect("/raffleskidz/centres");
    }
  );
});

// 7. DELETE
centres.delete("/:id", (req, res) => {
  Centre.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/raffleskidz/centres");
  });
});

// 8. CENTRE EMPLOYEE PAGE
centres.get("/:id/employees", (req, res) => {
  Centre.findById(req.params.id)
    .populate("employees")
    .exec((err, foundCentre) => {
      res.render("centres/team.ejs", {
        centre: foundCentre
      });
    });
});

// EXPORT ROUTER
module.exports = centres;
