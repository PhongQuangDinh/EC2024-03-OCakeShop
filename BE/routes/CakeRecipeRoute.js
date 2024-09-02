const express = require("express");
const router = express.Router();
const model = require("../models");
const { Op } = require("sequelize");
const { authenticateToken } = require("../routes/authenticationRoute");

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.CakeRecipes.findAll();

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
