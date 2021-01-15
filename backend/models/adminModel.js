const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    username: {type: String, required: true},
});

module.exports = Admin = mongoose.model("admin", adminSchema);