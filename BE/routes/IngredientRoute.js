const express = require("express");
const router = express.Router();
const model = require('../models');

// Lấy nguyên liệu
router.get("/", async (req, res, next) => {
  try {
    const ingredients = await model.Ingredient.findAll();

    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
