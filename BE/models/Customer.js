const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const CreditCard = require('./CreditCard');
const Cart = require('./Cart');

const Customer = sequelize.define('Customer', {
    customerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len:[0, 30],
        },
    },
    address:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 50],
        },
    },
    dateOfBirth:{
        type: DataTypes.DATE,
    },
    phoneNumber:{
        type: DataTypes.STRING,
        validate: {
            len:[0, 10],
        },
    },
    userID:{
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'userID',
        }
    },
},
{
    tableName: 'Customer',
    timestamps: false
});

Customer.hasOne(CreditCard, {foreignKey: 'customerID'});
Customer.belongsTo(CreditCard, {foreignKey: 'customerID'});

Customer.hasMany(Cart, {foreignKey: 'customerID'});
Customer.belongsTo(Cart, {foreignKey: 'customerID'});

module.exports = Customer;