const express = require('express');
const router = express.Router();
const model = require('../models');
const {authenticateToken} = require('../routes/authenticationRoute')

router.get('/myinfo', authenticateToken, async (req, res, next) => {
    try{
        const userID = req.user.userID;
        const user = await model.User.findOne({
            where: {userID: userID},
            include: [
                {
                    model: model.Customer,
                    required: true,
                    include: [
                        {
                            model: model.CreditCard,
                            required: false,
                        }
                    ]
                }
            ]
        });
        if(!user){
            return res.status(404).json({
                message: "User does not exist"
            });
        }
        
        res.status(200).json(user);
    }
    catch (err) {next(err)};
});

router.get('/cart/:id', async (req, res, next) => {
    try{
        const user = await model.Customer.findByPk(req.params.id, {
            include: [
                {
                    model: model.Cart,
                    // as: 'cart',
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