const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');

router.get('/cart/:id', async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id, {
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

        if(!user){
            return res.status(404).json({
                message: "User is not exist"
            });
        }
        else{
            return res.status(200).json(user)
        }
        res.status(200).json(user);
    }
    catch (err) {next(err)};
});

module.exports = router;