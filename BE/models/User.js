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
        static async createUser(user){
            try {
                const newUser = await User.create(user);
                return newUser;
            } catch (error) {
                throw new Error(`Error create user`);
            }
        }

        static async getAllUser(){
            try {
                const allUser = await User.findAll()
                return allUser;
            } catch (error) {
                throw new Error(`Error retrieving user`);
            }
        }

        static async updateUser(userID, newData){
            try {
                const [updateNewRowsCount] = await User.update(newData,{
                    where: {userID: userID}
                });
                return updateNewRowsCount > 0;
            } catch (error) {
                throw new Error(`Error update user`);
            }
        }
        static async deleteUser(userID){
            try {
                const userDelete = await User.findOne({
                    where: {userID: userID}
                })
                if(!userDelete){
                    console.log('User not found');
                }
                const isDelete = await User.destroy({
                    where: {userID: userID}
                })
                return isDelete > 0;
            } catch (error) {
                throw new Error(`Error delete user`);
            }
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
    )
  
    return User;
  };