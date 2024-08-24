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

router.post('/update', authenticateToken, async (req, res, next) => {
    try {
        const Customer = req.body; // Extract the Customer object from the request body
        console.log(Customer); // For debug
        const { customerID, name, address, dateOfBirth, phoneNumber } = Customer; // Destructure relevant fields from the Customer object

        if (!customerID) {
            return res.status(400).json({ message: "Customer ID is required." });
        }

        const [updatedRows] = await model.Customer.update(
            { name, address, dateOfBirth, phoneNumber }, // Only update relevant fields
            { where: { customerID: customerID } } // Use customerID to identify the correct customer
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Customer not found or no changes were made." });
        }

        // Fetch and return the updated customer data
        const updatedCustomer = await model.Customer.findOne({
            where: { customerID: customerID }
        });

        res.status(200).json(updatedCustomer);
    } catch (err) {
        next(err);
    }
});


module.exports = router;