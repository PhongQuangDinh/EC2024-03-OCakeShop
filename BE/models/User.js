// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const bcrypt = require('bcrypt');
// const Employee = require('../models/Employee');
// const Customer = require('../models/Customer');

// const User = sequelize.define('User', {
//     userID:{
//         type: DataTypes.INTEGER,
//         // autoIncrement: true,
//         primaryKey: true,
//     },
//     username:{
//         type: DataTypes.STRING,
//         allowNullValues: true,
//         validate: {
//             len: [0, 30]
//         },
//     },
//     password:{
//         type: DataTypes.STRING,
//         allowNullValues: true,
//         validate: {
//             len: [0, 100]
//         },
//     },
//     role:{
//         type: DataTypes.STRING,
//         allowNullValues: true,
//         defaultValue: 'khách hàng',
//         validate: {
//             len: [0, 20]
//         },
//     },
// },
//     {
//         tableName: 'User',
//         timestamps: false,
//         hooks: {
//             beforeCreate: async (user) => {
//                 user.password = await bcrypt.hash(user.password, 10);
//             },
//             beforeUpdate: async (user) => {
//                 if (user.changed('password')) {
//                     user.password = await bcrypt.hash(user.password, 10);
//                 }
//             }
//         }
//     });



// module.exports = User;



const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
        User.hasOne(models.Customer, {foreignKey: 'userID'});
        User.hasOne(models.Employee, {foreignKey: 'userID'});
      }
    }
  
    User.init(
      {
        userID:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        }
      },
      {
        sequelize,
        modelName: 'User',
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
      }
    );
  
    return User;
  };