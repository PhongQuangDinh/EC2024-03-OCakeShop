const express = require("express");
const router = express.Router();
const model = require('../models');
const paypal = require('../services/paypal');

const { Transaction, Op, fn, col } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const transactionList = await model.Payment.findAll();
    res.status(200).json(transactionList);
  } catch (err) {
    next(err);
  }
});


// lấy tổng tiền thu được group by theo giá, still not working
router.get("/profit-n-price", async (req, res, next) => {
  try {
    const profit = await model.Payment.findAll({
      attributes: [
        [fn('sum', col('Payment.amount')), 'totalAmount'], // Correct sum calculation with explicit table reference
        [col('OrderCart.Cake.priceCake'), 'priceCake'] // Direct reference to the priceCake column via the correct path
      ],
      include: [
        {
          model: model.OrderCake,
          required: true,
          include: [
            {
              model: model.OrderCakeDetail,
              as: 'OrderDetails',
              required: true,
              include: [
                {
                  model: model.Cart,
                  as: 'OrderCart', // Ensure this matches your model definition
                  required: true,
                  include: [
                    {
                      model: model.Cake,
                      as: 'Cake', // Ensure this alias is consistent with how Cake is referenced
                      required: true,
                      attributes: [] // No need to select additional attributes here
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      group: ['OrderCart.Cake.priceCake'], // Group by the correct reference path
      logging: console.log // This logs the SQL query to the console for inspection
    });
    
    
    res.status(200).json(profit);
  } catch (err) {
    next(err);
  }
});


// router.get("/user-payment-history/:id", async (req, res, next) => {
//   try {
//     const paymentHistory = await model.Payment.findAll();

//     res.status(200).json(paymentHistory);
//   } catch (err) {
//     next(err);
//   }
// });

// app.post('/pay', (req, res) => {
//   const url = paypal.createOrder(); // pass payment stuff here
//   res.redirect(url);
// });

router.post('/pay', (req, res) => { // put inside form action for submit button
  const url = paypal.createOrder().then(result => {
    res.status(200).json({"paypal_link": result});
  })
});

router.get('/CONTINUE-ORDER', (req, res) => {
  res.send('Bạn đã mất 100$ :33');
});
router.get('/CANCEL-ORDER', (req, res) => {
  res.send('Bạn ko trả dc ư >:(');
});

module.exports = router;