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

router.post("/machine/active", async (req, res, next) => {
  try {
    const machines = req.body;
    for(const machine of machines){
      const {bakingMachineID, status} = machine;
      const [updateRow] = await model.BakingMachine.update({
        status: status,
    },
  {
    where: {bakingMachineID}
  });
      if (updateRow === 0) {
        return res.status(400).json({ message: "Machine not found" });
      }
    }
    res.status(200).json({message: "Successful update machine"});
  } catch (err) {
    next(err);
  }
})

router.post("/machine/not-active", async (req, res, next) => {
  try {
    const machines = req.body;
    for(const machine of machines){
      const {bakingMachineID, status} = machine;
      const [updateRow] = await model.BakingMachine.update({
        status: status,

    },
  {
    where: {bakingMachineID}
  });
      if (updateRow === 0) {
        return res.status(400).json({ message: "Machine not found" });
      }
    }
    res.status(200).json({message: "Successful update machine"});
  } catch (err) {
    next(err);
  }
})

router.post("/cake/active", async (req, res, next) => {
  try {
    const cakes = req.body;
    for(const cake of cakes){
      const {orderCakeDetailID ,bakingMachineID, bakingStatus} = cake;
      const [updateRow] = await model.OrderCakeDetail.update(
        {
          bakingStatus: bakingStatus,
          bakingMachineID: bakingMachineID
        },
        {
          where: { orderCakeDetailID } // Correctly place the where clause here
        }
      );
      // if (updateRow === 0) {
      //   return res.status(400).json({ message: "Cake not found" });
      // }
    }
    res.status(200).json({message: "Successful update machine"});
  } catch (err) {
    next(err);
  }
})

router.post("/cake/complete", async (req, res, next) => {
  try {
    const cakes = req.body;
    for(const cake of cakes){
      const {orderCakeDetailID, bakingStatus} = cake;
      const [updateRow] = await model.OrderCakeDetail.update({
        bakingStatus: bakingStatus,
          },
        {
          where: {orderCakeDetailID}
        });
      // if (updateRow === 0) {
      //   return res.status(400).json({ message: "order cake id not found" });
      // }
    }
    res.status(200).json({message: "Successful update machine"});
  } catch (err) {
    next(err);
  }
})

router.get("/cake", async (req, res, next) => {
  try {
    const order = await model.OrderCakeDetail.findAll({
      where: {
        bakingStatus: {
          [Op.or]: ['Chưa xử lý', 'Đang xử lý']
        },
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
