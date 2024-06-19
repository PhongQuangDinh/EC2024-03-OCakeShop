const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    paymentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount:{
        type: DataTypes.FLOAT,
    },
    paymentTime:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    orderCakeID:{
        type: DataTypes.INTEGER,
    },
    customerID:{
        type: DataTypes.INTEGER,
    },
});

module.exports = Payment;