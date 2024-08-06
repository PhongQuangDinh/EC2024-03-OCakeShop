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

// // routes/cakes.js
const express = require("express");
const router = express.Router();
const model = require('../models');

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.Cake.findAll();

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
        const cake = await model.Cake.findByPk(req.params.id, {
            include:
                {
                    model: model.CakeImage,
                    as: "cakeImages",
                    required: true
                }
        });
            
        res.status(200).json(cake.cakeImages);
        // );
    }
    catch (err) { next(err); }
})
