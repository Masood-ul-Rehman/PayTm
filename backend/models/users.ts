import mongoose from "mongoose";

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
});
module.exports = mongoose.model("User", User);
