const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

// Get all users route
router.get("/", authController.getUsers);

// Register user route
router.post("/register", authController.register);

// Login user route
router.post("/login", authController.login);

// Verify token
router.post("/verify", authController.verifyToken);

// export router
module.exports = router;
