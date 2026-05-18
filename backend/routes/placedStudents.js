// backend/models/PlacedStudent.js
const mongoose = require("mongoose");

const placedStudentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  batch: String,
  company: String,
  role: String,
  package: Number,
  photo: String,   // store image URL or base64
}, { timestamps: true });

module.exports = mongoose.model("PlacedStudent", placedStudentSchema);