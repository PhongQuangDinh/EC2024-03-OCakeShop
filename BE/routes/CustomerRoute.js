const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/myinfor/:id', async (req, res, next) => {
    try{
        const user = await model.User.findOne({
            where: {userID: req.params.id},
            include: [
                {
                    model: model.Customer,
                    required: false,
                    include: [
                        {
                            model: model.CreditCard,
                            required: false,
                        }
                    ]
                }
            ]
        });

        console.log("HELP");

        if(!user){
            return res.status(404).json({
                message: "User is not exist"
            });
        }
        
        res.status(200).json(user);
    }
    catch (err) {next(err)};
});

router.get('/cart/:id/', async (req, res, next) => {
    try{
        const user = await model.Customer.findByPk(req.params.id, {
            include: [
                {
                    model: model.Cart,
                    as: 'cart',
                    required: true,
                    include: [
                        {
                            model: model.Cake,
                            required: true,
                        }
                    ]
                }
            ]
        }

        );
        res.status(200).json(user);
    }
    catch (err) {next(err)}
});

module.exports = router;