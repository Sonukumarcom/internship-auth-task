const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Registration Success! Ab login karo." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Details!" });

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Details!" });

    // Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "mysecret", { expiresIn: "1h" });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;