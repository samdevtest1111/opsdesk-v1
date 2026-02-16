const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const adminUserRoutes = require("./routes/adminUserRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/admin", adminUserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("OpsDesk Backend Running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
