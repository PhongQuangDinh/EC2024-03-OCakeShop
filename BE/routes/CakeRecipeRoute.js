const express = require("express");
const router = express.Router();
const model = require("../models");
// const { Op } = require("sequelize");
// const { authenticateToken } = require("../routes/authenticationRoute");

router.get("/machine", async (req, res, next) => {
  try {
    const BakingMachine = await model.BakingMachine.findAll();
    if(!BakingMachine){
      return res.status(404).json({ message: "No Baking Machine found" });
    }
    res.status(200).json(BakingMachine);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
