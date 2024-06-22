const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');

const User = sequelize.define('User', {
    userID:{
        type: DataTypes.INTEGER,
        // autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            len: [0, 30]
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            len: [0, 100]
        },
    },
    role:{
        type: DataTypes.STRING,
        allowNullValues: true,
        defaultValue: 'khách hàng',
        validate: {
            len: [0, 20]
        },
    },
},
    {
        tableName: 'User',
        timestamps: false,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    });

User.hasOne(Customer, {foreignKey: 'userID', as: 'customer'});
User.hasOne(Employee, {foreignKey: 'userID', as: 'employee'});

Employee.belongsTo(User, { foreignKey: 'userID', as: 'user' });
Customer.belongsTo(User, { foreignKey: 'userID', as: 'user' });

module.exports = User;