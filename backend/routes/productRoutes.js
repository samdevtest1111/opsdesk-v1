const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getProducts);

// Create new product
router.post("/", productController.createProduct);

// Update product
router.put("/:id", productController.updateProduct); // optional for now
router.delete("/:id", productController.deleteProduct); // optional for now

module.exports = router;
