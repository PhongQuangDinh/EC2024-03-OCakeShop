const express = require('express');
const router = express.Router();
const model = require('../models');
const {authenticateToken} = require('../routes/authenticationRoute');

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
        const { customerID, name, address, dateOfBirth, phoneNumber, bankName, creditSerialNumber } = Customer;

        if (!customerID) {
            return res.status(400).json({ message: "Customer ID is required." });
        }

        // Update the customer information
        const [updatedRows] = await model.Customer.update(
            { name, address, dateOfBirth, phoneNumber }, // Only update relevant fields
            { where: { customerID: customerID } } // Use customerID to identify the correct customer
        );

        console.log('Checking if bankName and creditSerialNumber are provided...');
        console.log('bankName:', bankName, 'creditSerialNumber:', creditSerialNumber);
        
        // Check if the CreditCard exists for the customerID
        const creditCard = await model.CreditCard.findOne({
            where: { customerID: customerID }
        });

        if (creditCard) {
            // Update existing CreditCard entry
            await creditCard.update({ bankName, creditSerialNumber });
        } else {
            // Create new CreditCard entry
            await model.CreditCard.create({
                customerID,
                bankName,
                creditSerialNumber
            });
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