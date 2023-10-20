const express = require("express");
const KPI = require("../models/KPI");
const kpiRoutes = express.Router();

kpiRoutes.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = kpiRoutes;
