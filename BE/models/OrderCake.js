const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const OrderCake = sequelize.define('OrderCake', {
    orderCakeID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderTime:{
        type: DataTypes.DATE,
        defaultValue: Date.now,
    },
    pickUpTime:{
        type: DataTypes.DATE,
        defaultValue: Date.now,
        allowNull: false,
    },
    note:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 255],
        },
    },
    deliveryStatus:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 50],
        },
    },
    receiveStatus:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 50],
        },
    },
    handleStatus:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 50],
        },
    },
});


module.exports = OrderCake;