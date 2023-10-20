const express = require("express");
const Transaction = require("../models/Transaction");
const transactionRoutes = express.Router();

transactionRoutes.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

module.exports = transactionRoutes;
