const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport"); // Added
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Added

const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes"); // Ensure path is correct
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));
