const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await prisma.product.create({
      data: { name, price, description },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price, description },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// Export all functions
module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
