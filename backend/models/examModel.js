const { json } = require("express");
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examCode: { type: String, required: true, unique: true },
  questions: { type: Array, required: true },
});

module.exports = Exam = mongoose.model("exam", examSchema);
