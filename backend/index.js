const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS + credentials
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // important!
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Backend running 🚀"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
