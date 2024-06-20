const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    employeeID: {
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
    roleEmployee:{
        type: DataTypes.STRING,
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
    tableName: 'Employee',
    timestamps: false
});

module.exports = Employee;