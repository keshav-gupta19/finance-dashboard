const express = require("express");
const Product = require("../models/Product");
const ProductRoutes = express.Router();

ProductRoutes.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = ProductRoutes;
