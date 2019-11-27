// ROUTER SETUP
const express = require("express");
const employees = express.Router();

// LINK WITH EMPLOYEE MODEL
const Employee = require("../models/employee/employee");
const newEmployees = require("../models/employee/seed_employee");

// LINK WITH CENTRE MODEL
const Centre = require("../models/centre/centre");

// SEED DATA
employees.get("/seed", (req, res) => {
  Employee.insertMany(newEmployees, (error, employees) => {
    if (error) {
      console.log(error);
    } else {
      console.log(employees);
      res.send(employees);
    }
  });
});

// 1. INDEX PAGE
employees.get("/", (req, res) => {
  if (req.session.currentUser) {
    Employee.find({})
      .populate("centre")
      .exec((error, allEmployees) => {
        res.render("employees/index.ejs", {
          employees: allEmployees
        });
      });
  } else {
    res.redirect("/sessions/new");
  }
});

// 2. NEW EMPLOYEE PAGE
employees.get("/new", (req, res) => {
  Employee.find({})
    .populate("centre")
    .exec((error, foundEmployees) => {
      Centre.find({}, (err, foundCentres) => {
        res.render("employees/new.ejs", {
          employees: foundEmployees,
          centres: foundCentres
        });
      });
    });
});

// 3. SHOW PAGE
employees.get("/:id", (req, res) => {
  Employee.findById(req.params.id)
    .populate("centre")
    .exec((err, foundEmployee) => {
      res.render("employees/show.ejs", {
        employee: foundEmployee
      });
    });
});

// 4. POST NEW EMPLOYEE
employees.post("/", (req, res) => {
  Employee.create(req.body, (error, createdEmployee) => {
    res.redirect("/raffleskidz/employees");
  });
});

// 5. EDIT PAGE
employees.get("/:id/edit", (req, res) => {
  Employee.findById(req.params.id)
    .populate("centre")
    .exec((err, foundEmployee) => {
      Centre.find({}, (err, foundCentres) => {
        res.render("employees/edit.ejs", {
          employee: foundEmployee,
          centres: foundCentres
        });
      });
    });
});

// 6. PUT
employees.put("/:id", (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      res.redirect("/raffleskidz/employees/" + req.params.id);
    }
  );
});

// 7. DELETE
employees.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/raffleskidz/employees");
  });
});

// EXPORT ROUTER
module.exports = employees;
