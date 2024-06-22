const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const OrderCakeDetail = require('./OrderCakeDetail');

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
    customerID:{
        type: DataTypes.INTEGER,
    },
    cakeID:{
        type: DataTypes.INTEGER,
    },
},
{
    tableName: 'Cart',
    timestamps: false
});

Cart.hasMany(OrderCakeDetail, { foreignKey: 'cartID', as: 'cart' });
OrderCakeDetail.belongsTo(Cart, { foreignKey: 'cartID', as: 'orderCakeDetail' });

module.exports = Cart;