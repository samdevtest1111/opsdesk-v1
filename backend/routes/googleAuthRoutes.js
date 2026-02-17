const express = require("express");
const router = express.Router();
const {
  googleAuth,
  googleCallback,
} = require("../controllers/googleAuthController");

// Redirect user to Google for login
router.get("/google", googleAuth);

// Google callback URL
router.get("/google/callback", googleCallback);

// Optional: success route to confirm login
router.get("/success", (req, res) => {
  if (req.user) {
    res.json({ message: "Google login successful", user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
