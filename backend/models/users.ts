import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});
module.exports = mongoose.model("User", User);
