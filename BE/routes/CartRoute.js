
const express = require('express');
const router = express.Router();
const model = require('../models');
const {authenticateToken} = require('../routes/authenticationRoute');

router.get('/', authenticateToken, async (req, res, next) => {
    try{
        const userID = req.user.userID;
        const role = req.user.role;
        const cart = await model.Cart.findAll({
            where: {status: "Chưa mua"},
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
        });

        if(!cart){
            return res.status(404).json({
                message: "User is not exist"
            });
        }
        else{
            return res.status(200).json(cart)
        }
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

router.post('/update-cake', async (req, res, next) => {
    try {
        // const cartID = req.params.id;
        const Cart = req.body;
        // console.log(Cart);
        const {cartID, quantity} = Cart;
        console.log('quantity: ' + quantity);
        console.log('cartID: ' + cartID);
        const [cart] = await model.Cart.update(
            {
                quantity,
            },
            {
                where: {cartID}
            })
        if(cart===0){
            return res.status(404).json({ message: "Cart not found or no changes were made." });
        }
        const updatedCart = await model.Cart.findOne({
            where: { cartID}
        });

        res.status(200).json(updatedCart);
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
