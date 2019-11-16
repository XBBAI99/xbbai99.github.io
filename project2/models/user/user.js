// MONGODB SCHEMA SETUP
const mongoose = require("mongoose");
const Schema = mongoose.Schema; // SHORTHAND FOR MONGOOSE SCHEMA

// USER SCHEMA SETUP
const userSchema = new Schema(
  {
    username: String,
    password: String
  },
  { timestamps: true }
);

// USER MODEL SETUP
const User = mongoose.model("User", userSchema); // DEFINE MONGODB DOCUMENT "USER"

// EXPORT USER MODEL
module.exports = User;
