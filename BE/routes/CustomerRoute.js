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

router.get('/:id/cart', async (req, res, next) => {
    try{
        const user = await model.Customer.findByPk(req.params.id, {
            include: [
                {
                    model: model.Cart,
                    include: [
                        {
                            model: model.Cake,
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