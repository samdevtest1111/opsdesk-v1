const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
const adminUserRoutes = require("./routes/adminUserRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

app.use("/api/admin", adminUserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", googleAuthRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("OpsDesk Backend Running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
