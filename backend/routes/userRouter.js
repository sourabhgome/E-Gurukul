const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const { json } = require("express");

router.get("/test", (req, res) =>{
    res.send("Hello, it's working.");
});

router.post("/registerUser", async (req, res) => {
    try
    {
        let { email, password, passwordCheck, username } = req.body;

        console.log("Register User chaala");

        //validations

        if(!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Not all fields have been entered!" });
        if(password.length < 5)
            return res.status(400).json({msg: "The password needs to be atleast 5 characters long!" });
        if(password!=passwordCheck)
            return res.status(400).json({msg: "Enter the same password twice!" });

        const existingUser = await User.findOne({email: email});
        if(existingUser)
            return res.status(400).json({msg: "An account with this email already exists!" });
        if(!username)
            username = email;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            username,
        });

        const savedUser = await newUser.save();
        
        res.json(savedUser);

    }catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});

router.post("/loginUser", async (req, res) => {
    try
    {
        const { email, password } = req.body;

        console.log("Login user chala");

        if(!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        
        const user = await User.findOne({ email : email});

        if(!user)
            return res.status(400).json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch)
            return res.status(400).json({ msg: "Wrong Password!" });

        //Initialize JsonWebToken for verfication of the logged in user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    }catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});

router.post("/practice", auth, async (req, res) => {

});

router.delete("/deleteUser", auth, async (req, res) => {
    try
    {
        console.log("Delete user chala");
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    }catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});

router.post("/isTokenValid", async (req, res) => {
    try
    {
        console.log(req.headers);
        const token = req.header("x-auth-token");
        console.log("This is token : ");
        console.log(token);
        console.log("Is token valid chala");
        if(!token) return res.json(false);
        console.log("Token : ",token);
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Verified : ",verified);
        if(!verified)
            return res.json(false);
        console.log("Yaha bhi aaya");
        const user = await User.findById(verified.id);
        if(!user)
            return res.json(false);
    
        return res.json(true);

    }catch(err)
    {
        res.status(500).json({ error : err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user);
});

module.exports = router;