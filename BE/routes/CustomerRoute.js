const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/Customer');
const CreditCard = require('../models/CreditCard');

router.get('/myinfor/:id', async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Customer,
                    as: 'Customer',
                    include: [
                        {
                            model: CreditCard,
                            as: 'CreditCard',
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
        
        res.status(200).json(user.Customer);
    }
    catch (err) {next(err)};
});

module.exports = router;