const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const {
  googleAuth,
  googleCallback,
} = require("../controllers/googleAuthController");
const { authenticate } = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", authenticate, (req, res) => {
  return res.json({ userId: req.user.id, role: req.user.role });
});

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

// Optional success endpoint
router.get("/success", (req, res) => {
  res.send("Google login successful!");
});

module.exports = router;
