
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');

router.get('/cart/:id', async (req, res, next) => {
    try {
        const user = await model.User.findByPk(req.params.id, {
            include: [
                {
                    model: Customer,
                    as: 'Customer',
                    include: [
                        {
                            model: Cart,
                            as: 'Cart',
                        }
                    ]
                }
            ]
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

const model = require('../models');

// router.get('/cart/:id', async (req, res, next) => {
//     try{
//         const user = await User.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: Customer,
//                     as: 'Customer',
//                     include: [
//                         {
//                             model: Cart,
//                             as: 'Cart',
//                         }
//                     ]
// const model = require('../models');

router.get('/:id', async (req, res, next) => {
    try{
        const cart = await model.Cart.findByPk(req.params.id, {
            include: [
                {
                    model: model.Cake,
                }
            ]
        });

        if(!user){
            return res.status(404).json({
                message: "User is not exist"
            });
        }
        else{
            return res.status(200).json(user)
        }
        res.status(200).json(user);
        if(!cart){
            return res.status(404).json({
                message: "Cart is not exist"
            });
        }
        res.status(200).json(cart);
    }
    catch (err) {next(err)};
});

router.get('/', async (req, res, next) => {
    try{
        const cart = await model.Cart.findAll();
        res.status(200).json(cart);
    }
    catch (err) {next(err)};
});

// thêm bánh vào giỏ hàng
router.post('/add-to-cart', async (req, res, next) => {
    try {
      const cartData = req.body;
  
      // Tạo mục giỏ hàng mới sử dụng phương thức model
      const newCartItem = await model.Cart.create(cartData);
      res.status(201).json(newCartItem);
    } catch (err) {
      // Chuyển lỗi cho middleware xử lý lỗi toàn cục
      next(err);
    }
  });
  

module.exports = router;
