// ROUTER SETUP
const express = require("express");
const router = express.Router();

// LINK WITH CENTRE MODEL
const Centre = require("../models/centre/centre");
const newCentres = require("../models/centre/seed_centre");

// SEED DATA
// Centre.insertMany(newCentres, (error, centres) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(centres);
//   }
// });

// 1. INDEX PAGE
router.get("/", (req, res) => {
  Centre.find({}, (error, allCentres) => {
    res.render("centres/index.ejs", {
      centres: allCentres
    });
  });
});

// 2. NEW CENTRE PAGE
router.get("/new", (req, res) => {
  res.render("centres/new.ejs");
});

// 3. SHOW PAGE
router.get("/:id", (req, res) => {
  Centre.findById(req.params.id, (err, foundCentre) => {
    res.render("centres/show.ejs", {
      centre: foundCentre
    });
  });
});

// 4. POST NEW CENTRE
router.post("/", (req, res) => {
  Centre.create(req.body, (error, createdCentre) => {
    res.redirect("/raffleskidz/centres");
  });
});

// 5. EDIT PAGE
router.get("/:id/edit", (req, res) => {
  Centre.findById(req.params.id, (err, foundCentre) => {
    res.render("centres/edit.ejs", {
      centre: foundCentre
    });
  });
});

// 6. PUT
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Centre.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/raffleskidz/centres");
  });
});

// EXPORT ROUTER
module.exports = router;
