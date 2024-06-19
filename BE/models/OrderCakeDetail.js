const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const OrderCakeDetail = sequelize.define('OrderCakeDetail', {
    orderCakeDetailID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bakingStatus:{
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
    cartID:{
        type: DataTypes.INTEGER,
    },
    orderCakeID:{
        type: DataTypes.INTEGER,
    }
},
{
    tableName: 'OrderCakeDetail',
    timestamps: false
});


module.exports = OrderCakeDetail;