const mongoose = require("mongoose");

const practiceQuestionsSchema = new mongoose.Schema({
    questions: {type: Array, required: true},
 },
 {collection: 'practice-questions'});

module.exports = User = mongoose.model("PracticeQuestions", practiceQuestionsSchema);