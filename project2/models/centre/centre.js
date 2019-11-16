// MONGODB SCHEMA SETUP
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // SHORTHAND FOR MONGOOSE SCHEMA

// USE SCHEMA SETUP
const centreSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    description: String,
    img: String,
    fee: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

// CENTRE MODEL SETUP
const Centre = mongoose.model("Centre", centreSchema); // DEFINE MONGODB DOCUMENT "CENTRE"

// EXPORT PRODUCT MODEL
module.exports = Centre;
