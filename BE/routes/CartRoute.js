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

        const cartOrdered = await model.Cart.findAll({
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
                    model: model.OrderCakeDetail,
                    as: "OrderDetails",
                    required: false,
                }
            ],
            // having: model.sequelize.where(model.sequelize.fn('COUNT', model.sequelize.col('OrderDetails.orderCakeDetailID')), '=', 0),
            // group: ['Cart.cartID']
        });

        const cartsWithoutOrderDetails = cartOrdered.filter(cart => !cart.OrderDetails.length);


        if (cartsWithoutOrderDetails.length === 0) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }
        
        // if(cartOrdered)
        else{
            return res.status(200).json(cartsWithoutOrderDetails)
        }
    }
    catch (err) {next(err)};
});

router.post('/return-cart', authenticateToken, async (req, res, next) => {
    try {
        const Carts = req.body;
        for (const Cart of Carts) {
            const { cartID} = Cart;
          
            try {
              const [updateRows] = await model.Cart.update(
                {
                    status: "Chưa mua",
                },
                {
                  where: {cartID }
                });
                if(updateRows===0){
                    return res.status(404).json({ message: "Cart not found or no changes were made." });
                }
                const updatedCart = await model.Cart.findOne({
                    where: { cartID}
                });

                res.status(200).json(updatedCart);
                }
            catch(err) {
                console.error(`Failed to update OrderCakeDetailID ${orderCakeDetailID}:`, err);
            }
        }
    }
    catch(err){
        console.error('Want to buy item from cart:', err);
        next(err)
    }
});

router.post('/buying', authenticateToken, async (req, res, next) => {
    try {
        const Cart = req.body;
        const {cartID} = Cart;
        const [cart] = await model.Cart.update(
            {
                status: "Đang mua",
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
        console.error('Want to buy item from cart:', err);
        next(err)
    }
});

router.get('/buying', authenticateToken, async (req, res, next) => {
    try{
        const userID = req.user.userID;
        const role = req.user.role;
        const cart = await model.Cart.findAll({
            where: {status: "Đang mua"},
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

        if(cart.length === 0){
            return res.status(404).json({
                message: "Cart is not exist"
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
        const {cartID, quantity} = Cart;
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

// router.post('/add-to-cart', authenticateToken, async (req, res, next) => {
//     try {
//         const cartData = req.body;
//         const customerID = req.user.userID;
//         const {quantity, floor, additionalDetail, cakeID, cakeFillingID, cakeSizeID} = cartData;
//         const size = await model.CakeSize.findByPk(cakeSizeID);
//         const filling = await model.CakeFilling.findByPk(cakeFillingID);
//         const priceCake = size.priceSize + filling.priceCakeFilling;
//         const newCartItem = await model.Cart.create({
//             quantity, floor, additionalDetail, cakeID, cakeFillingID, cakeSizeID, customerID, priceCake
//         }, {status: "Chưa mua"});
//         res.status(201).json(newCartItem);
//     } catch (err) {
//       next(err);
//     }
//   });
router.post('/add-to-cart', authenticateToken, async (req, res, next) => {
    try {
        const cartData = req.body;
        const customerID = req.user.userID;
        const {quantity, floor, additionalDetail, cakeID, cakeFillingID, cakeSizeID} = cartData;

        const size = await model.CakeSize.findByPk(cakeSizeID);
        const filling = await model.CakeFilling.findByPk(cakeFillingID);

        if (!size || !filling) {
            return res.status(404).json({ message: "Size or filling not found" });
        }

        const priceCake = size.priceSize + filling.priceCakeFilling;

        const newCartItem = await model.Cart.create({
            quantity, floor, additionalDetail, cakeID, cakeFillingID, cakeSizeID, customerID, priceCake, status: "Chưa mua"
        });

        res.status(201).json(newCartItem);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "Internal Server Error" });
        next(err);
    }
});



module.exports = router;
