// routes/cakes.js
const express = require("express");
const router = express.Router();
const { Cake, CakeImage, ImageDetail } = require("../models/associations");

router.get("/", async (req, res, next) => {
  try {
    const cakes = await Cake.findAll({
      include: [
        {
          model: CakeImage,
          as: "cakeImages",
          include: [
            {
              model: ImageDetail,
              as: "imageDetail",
            },
          ],
        },
      ],
    });
    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
