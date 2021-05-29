const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Exam = require("../models/examModel");
const auth = require("../middleware/auth");
const { json } = require("express");

router.post("/registerAdmin", async (req, res) => {
  try {
    let { email, password, passwordCheck, username } = req.body;

    //validations

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered!" });
    if (password.length < 5)
      return res.status(400).json({ msg: "The password needs to be atleast 5 characters long!" });
    if (password != passwordCheck) return res.status(400).json({ msg: "Enter the same password twice!" });

    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) return res.status(400).json({ msg: "An account with this email already exists!" });
    if (!username) username = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: passwordHash,
      username,
    });

    const savedAdmin = await newAdmin.save();

    res.json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/loginAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: "Not all fields have been entered." });

    const admin = await Admin.findOne({ email: email });

    if (!admin) return res.status(400).json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) return res.status(400).json({ msg: "Wrong Password!" });

    //Initialize JsonWebToken for verfication of the logged in user
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteAdmin", auth, async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.admin);
    res.json(deletedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/isTokenValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) return res.json(false);
    const admin = await Admin.findById(verified.id);
    if (!admin) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/createExam", async (req, res) => {
  try {
    let { questions } = req.body;

    //validations

    if (!questions) return res.status(400).json({ msg: "Json not valid!" });
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const generateString = (length) => {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };
    let examCode = generateString(7);
    var existingAdmin = await Admin.findOne({ examCode: examCode });
    while (existingAdmin) {
      console.log(existingAdmin);
      examCode = generateString(7);
      existingAdmin = await Admin.findOne({ examCode: examCode });
    }

    const newExam = new Exam({
      examCode,
      questions,
    });

    const savedExam = await newExam.save();

    res.json({ examCode: examCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const admin = await Admin.findById(req.admin);
  res.json(admin);
});

module.exports = router;
