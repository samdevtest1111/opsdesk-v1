const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");

// Routes for admin user management
router.post("/", adminUserController.createUser); // Create user
router.get("/", adminUserController.getUsers); // Get all users
router.put("/:id", adminUserController.updateUser); // Update user by ID
router.delete("/:id", adminUserController.deleteUser); // Delete user by ID

module.exports = router;
