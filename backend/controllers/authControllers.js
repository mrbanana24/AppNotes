const User = require("../models/authModels");
const jwt = require("jsonwebtoken");
// comparePassword and generateToken are methods defined in services/userServices.js
const { comparePassword, generateToken } = require("../services/authServices");

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Register user (Create user)
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create new user
    const user = new User({
      username,
      email,
      password,
    });
    // Save new user
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Generate token
    const token = await generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Verify token
exports.verifyToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    // Verify token
    const decoded = jwt.verify(token, "secretkey");
    // Add user from payload
    req.user = decoded;
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
