// MONGODB SCHEMA SETUP
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // SHORTHAND FOR MONGOOSE SCHEMA

// EMPLOYEE SCHEMA SETUP
const employeeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    img: String,
    centre: { type: Schema.Types.ObjectId, ref: "Centre" },
    title: { type: String, required: true },
    joinYear: { type: Number, required: true }
  },
  { timestamps: true }
);

// EMPLOYEE MODEL SETUP
const Employee = mongoose.model("Employee", employeeSchema); // DEFINE MONGODB DOCUMENT "EMPLOYEE"

// EXPORT EMPLOYEE MODEL
module.exports = Employee;
