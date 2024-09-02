const express = require("express");
const router = express.Router();
const model = require('../models');
const paypal = require('../services/paypal');
const { authenticateToken } = require('../routes/authenticationRoute');

const { Transaction, Op, fn, col } = require("sequelize");
// const OrderCakeDetail = require("../models/OrderCakeDetail");

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

router.post('/pay', authenticateToken, async (req, res, next) => { // put inside form action for submit button
  console.log(req.body);
  try {
    const url = paypal.createOrder(req.body).then(result => {
      res.status(200).json({ "paypal_link": result });
    })
  }
  catch (err) { next(err) };
});

// router.post('/killLinkOrder', authenticateToken, async (req, res, next) => {
//   const { token } = req.body;
//   try {
//     const invalidateOrder = paypal.killOrder(token);
//     res.status(200).json(invalidateOrder);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/CONTINUE-ORDER', authenticateToken, async (req, res, next) => {
//   try {
//     const userID = req.user.userID;
//     let amount = 0;
//     const carts = await model.Cart.findAll({
//       where: {status: "Đang mua"},
//       include: [
//           {
//               model: model.Customer,
//               as: "customer",
//               required: true,
//               where: {userID: userID}
//           },
//           {
//               model: model.Cake,
//               required: true,
//           },
//           {
//               model: model.CakeSize,
//               as: "cakeSize",
//               required: true,
//           },
//           {
//               model: model.CakeFilling,
//               as: "cakeFilling",
//               required: true,
//           }
//       ]
//     });
//     if(!carts){
//       res.status(404).json({message: "Không có đơn hàng nào đang mua!"});
//       return;
//     }
//     // res.json(carts);
//     let orderCake;
//     for (const cart of carts){
//       const {cartID, priceCake, quantity} = cart;
//       amount += priceCake * quantity;
//       const [updateRows] = await await model.Cart.update(
//         {
//             status: "Đang mua",
//         },
//         {
//           where: {cartID }
//         });
//         // res.json(updateRows)
//         if(updateRows===0){
//             return res.status(404).json({ message: "Cart not found or no changes were made." });
//         }
//         const updatedCart = await model.Cart.findOne({
//             where: { cartID}
//         });
//         if(!updateRows){
//           res.status(404).json({ message: "Cart not updated"})
//         }
//         // res.status(200).json(updatedCart);

//         orderCake = await model.OrderCake.findOne({
//           include: [{
//             model: model.OrderCakeDetail,
//             as: 'OrderDetails',
//             required: true,
//             where: {
//               cartID: cartID
//             }
//           }]
//         })
//         res.json(orderCake);
//     }
//     // if(!orderCake){
//     //   res.status(404).json({"message": "Don't have cake in cart"})
//     // }
//     // const {orderCakeID} = orderCake[0].orderCakeID > 0 ? orderCake[0].orderCakeID : 0;
//     // if(!orderCakeID){
//     //   res.status(404).json({"message": "Don't have cake in cart"})
//     // }
//     // const {creditCardID} = await model.CreditCard.findOne({
//     //   include: [{
//     //     model: model.Customer,
//     //     required: true,
//     //     where: {userID}
//     //   }]
//     // })
//     // try{
//     //   const payment = await model.Payment.create({
//     //     amount, orderCakeID, creditCardID
//     //   });
//     //   if(!payment){
//     //     res.status(404).json("Add payment failed");
//     //     return;
//     //   }
//     //   res.status(200).json(payment);
//     // }
//     // catch(err){
//     //   next(err)
//     // }
//   }
//   catch (err) { next(err) };
// });

router.post('/CONTINUE-ORDER', authenticateToken, async (req, res, next) => {
  try {
    const userID = req.user.userID;
    let amount = 0;
    const carts = await model.Cart.findAll({
      where: { status: "Đang mua" },
      include: [
        {
          model: model.Customer,
          as: "customer",
          required: true,
          where: { userID: userID }
        },
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
        }
      ]
    });

    if (carts.length === 0) {
      return res.status(404).json({ message: "Không có đơn hàng nào đang mua!" });
    }
    let cartIDs = [];
    for (const cart of carts) {
      const { cartID, priceCake, quantity } = cart;
      // res.status(200).json(cartID);
      amount += priceCake * quantity;
      cartIDs.push(cartID);

      const [updateRows] = await model.Cart.update(
        {
          status: "Đã mua",
        },
        {
          where: { cartID: cartID }
        }
      );
      // res.status(200).json(updateRows);
      if (updateRows === 0) {
        return res.status(404).json({ message: "Cart not found or no changes were made." });
      }
    }

    // Tìm `OrderCake` dựa trên danh sách `cartIDs` đã cập nhật
    const orderCake = await model.OrderCake.findOne({
      include: [{
        model: model.OrderCakeDetail,
        as: 'OrderDetails',
        required: true,
        where: {
          cartID: cartIDs
        }
      }]
    });

    if (!orderCake) {
      return res.status(404).json({ message: "Order not found for the given carts." });
    }

    const orderCakeID = orderCake.OrderDetails[0].orderCakeID; // Assuming OrderDetails is an array
    const creditCard = await model.CreditCard.findOne({
      include: [{
        model: model.Customer,
        required: true,
        where: { userID }
      }]
    });

    if (!creditCard) {
      return res.status(404).json({ message: "Credit card not found." });
    }

    const payment = await model.Payment.create({
      amount,
      orderCakeID,
      creditCardID: creditCard.creditCardID
    });

    if (!payment) {
      return res.status(404).json("Add payment failed");
    }

    res.status(200).json(payment);
  } catch (err) {
    next(err);
  }
});


router.post('/CANCEL-ORDER', authenticateToken, async (req, res, next) => {
  try {
    const userID = req.user.userID;
    let amount = 0;
    const carts = await model.Cart.findAll({
      where: { status: "Đang mua" },
      include: [
        {
          model: model.Customer,
          as: "customer",
          required: true,
          where: { userID: userID }
        },
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
        }
      ]
    });

    if (carts.length === 0) {
      return res.status(404).json({ message: "Không có đơn hàng nào đang mua!" });
    }
    let cartIDs = [];
    for (const cart of carts) {
      const { cartID, priceCake, quantity } = cart;
      // res.status(200).json(cartID);
      amount += priceCake * quantity;
      cartIDs.push(cartID);

      const [updateRows] = await model.Cart.update(
        {
          status: "Chưa mua",
        },
        {
          where: { cartID: cartID }
        }
      );
      if (updateRows === 0) {
        return res.status(404).json({ message: "Cart not found or no changes were made." });
      }
    }

    // Tìm `OrderCake` dựa trên danh sách `cartIDs` đã cập nhật
    const orderCake = await model.OrderCake.findAll({
      include: [{
        model: model.OrderCakeDetail,
        as: 'OrderDetails',
        required: true,
        where: {
          cartID: cartIDs
        }
      }]
    });
    const orderCakeDetail = await model.orderCakeDetail.findAll({
        where: {
          cartID: cartIDs
        }
    });

    if (!orderCake) {
      return res.status(404).json({ message: "Order not found for the given carts." });
    }

    if (!orderCakeDetail) {
      return res.status(404).json({ message: "Order detail not found for the given carts." });
    }

    const orderCakeID = orderCake.OrderDetails[0].orderCakeID;
    const creditCard = await model.CreditCard.findOne({
      include: [{
        model: model.Customer,
        required: true,
        where: { userID }
      }]
    });

    if (!creditCard) {
      return res.status(404).json({ message: "Credit card not found." });
    }

  }
  catch (err) { next(err) };
});

module.exports = router;