const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

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
    },
});

module.exports = Customer;