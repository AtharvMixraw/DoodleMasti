const express = require("express");
const { signup, login, getUserDetails } = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken"); // Middleware to verify token
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateToken, getUserDetails); // New route

module.exports = router;
