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

// Export
module.exports = { getProducts, createProduct };
