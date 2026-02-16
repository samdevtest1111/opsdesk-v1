const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
} = require("../controllers/adminUserController");

router.get("/users", getAllUsers);
router.post("/users", createUser);

module.exports = router;
