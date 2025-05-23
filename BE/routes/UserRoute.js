const express = require("express");
const router = express.Router();
const model = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const user = await model.User.findAll();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await model.User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
