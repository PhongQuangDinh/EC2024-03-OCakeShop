
const express = require('express');
const router = express.Router();
const model = require('../models');
const {authenticateToken} = require('../routes/authenticationRoute');
// const User = require('../models/User');
// const Customer = require('../models/Customer');
// const Cart = require('../models/Cart');

// router.get('/cart/:id', async (req, res, next) => {
//     try {
//         const user = await model.User.findByPk(req.params.id, {
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
//                 }
//             ]
//         });

//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (err) {
//         next(err);
//     }
// });

// module.exports = router;

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

router.get('/', authenticateToken, async (req, res, next) => {
    try{
        const userID = req.user.userID;
        const cart = await model.Cart.findAll({
            include: [
                {
                    model: model.Customer,
                    as: "customer",
                    required: true,
                    where: {userID: userID}
                },
                {
                    model: model.Cake,
                    required: true,
                    include: 
                    [
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
                }
            ]
            // where: {userID: userID},
            // include: [
            //     {
            //         model: model.Customer,
            //         required: true,
            //         include: [
            //             {
            //                 model: model.Cart,
            //                 required: true,
            //                 include: [
            //                     {
            //                       model: model.Cake,
            //                       required: true,
            //                       include: 
            //                       [
            //                         {
            //                         model: model.CakeSize,
            //                         as: "cakeSize",
            //                         required: true,
            //                         },
            //                         {
            //                           model: model.CakeFilling,
            //                           as: "cakeFilling",
            //                           required: true,
            //                         }
            //                       ]
            //                     }
            //                   ]
            //             }
            //         ]
            //     }
            // ]
        });

        if(!cart){
            return res.status(404).json({
                message: "User is not exist"
            });
        }
        else{
            return res.status(200).json(cart)
        }
        // res.status(200).json(user);
        // if(!cart){
        //     return res.status(404).json({
        //         message: "Cart is not exist"
        //     });
        // }
        // res.status(200).json(cart);
    }
    catch (err) {next(err)};
});

router.delete('/delete-cake/:id', authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id;
        await model.Cart.destroy({
            where: {cartID: id}
        });
        return res.status(200).json({ message: 'Item deleted successfully' });
        
    }
    catch(err){
        console.error('Error deleting item from cart:', err);
        next(err)
    }
});

router.post('/update-cake/:id', async (req, res, next) => {
    try {
        // const id = req.params.id;
        // await model.Cart.destroy({
        //     where: {cartID: id}
        // });
        // return res.status(200).json({ message: 'Item deleted successfully' });
        
    }
    catch(err){
        console.error('Error deleting item from cart:', err);
        next(err)
    }
});

// router.get('/', async (req, res, next) => {
//     try{
//         const cart = await model.Cart.findAll();
//         res.status(200).json(cart);
//     }
//     catch (err) {next(err)};
// });

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
