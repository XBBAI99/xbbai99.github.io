// MONGODB SCHEMA SETUP
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // SHORTHAND FOR MONGOOSE SCHEMA

// CENTRE SCHEMA SETUP
const centreSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    description: String,
    img: String,
    fee: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 0 },
    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }]
  },
  { timestamps: true }
);

// CENTRE MODEL SETUP
const Centre = mongoose.model("Centre", centreSchema); // DEFINE MONGODB DOCUMENT "CENTRE"

// EXPORT CENTRE MODEL
module.exports = Centre;
