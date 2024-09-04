const express = require("express");
const router = express.Router();
const model = require("../models");
const { Op } = require("sequelize");
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

router.get("/cake", async (req, res, next) => {
  try {
    const order = await model.OrderCakeDetail.findAll({
      where: {
        bakingStatus: 'Chưa xử lý',
        handleStatus: 'Đã xử lý',
      },
      include: [
        {
          model: model.OrderCake,
          as: "OrderDetails",
          required: true,
          where: {
            pickUpTime: {
              [Op.gte]: new Date(),
            },
          },
        },
        {
          model: model.Cart,
          as: "OrderCart",
          required: true,
          where: { status: "Đã mua" },
          include: [
            {
              model: model.Cake,
              required: true,
            },
            {
              model: model.CakeSize,
              as: "cakeSize",
              required: true,
            },
            {
              model: model.CakeFilling,
              as: "cakeFilling",
              required: true,
            },
            {
              model: model.Customer,
              as: "customer",
              required: true,
            },
          ],
        },
      ],
      order: [["arrange", "ASC"]],
    });
    if (order.length <= 0) {
      res.status(403).json({ message: "order cake not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
