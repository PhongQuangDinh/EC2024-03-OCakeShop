const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
    cartID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity:{
        type: DataTypes.INTEGER,
    },
    floor:{
        type: DataTypes.INTEGER,
    },
    additionalDetail:{
        type: DataTypes.STRING,
        validated:{
            len:[0, 255]
        },
    },
    pickUpTime:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status:{
        type: DataTypes.STRING,
        validated:{
            len:[0, 50]
        },
    },
    cakeID:{
        type: DataTypes.INTEGER,
    },
    customerID:{
        type: DataTypes.INTEGER,
    },
});

module.exports = Cart;