// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const Cart = require('./Cart');
// const CreditCard = require('./CreditCard');

// const Customer = sequelize.define('Customer', {
//     customerID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 30],
//         },
//     },
//     address:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
//     dateOfBirth:{
//         type: DataTypes.DATE,
//     },
//     phoneNumber:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 10],
//         },
//     },
//     userID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'Customer',
//     timestamps: false
// });

// Customer.hasMany(CreditCard, { foreignKey: 'customerID', as: 'creditCard' });
// Customer.hasMany(Cart, { foreignKey: 'customerID', as: 'cart' });

// CreditCard.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });
// Cart.belongsTo(Customer, { foreignKey: 'customerID', as: 'customer' });

// module.exports = Customer;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
      static associate(models) {
        // Customer.belongsToMany(models.Genre, { through: models.GenreCustomer, foreignKey: 'Customer' });
        // Customer.hasMany(models.CustomerTrailer, { foreignKey: 'Customer'})
        // Customer.belongsToMany(models.Award, { through: models.AwardCustomer, foreignKey: 'Customer_id' });
      }
    }
  
    Customer.init(
      {
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
      },
      {
        sequelize,
        modelName: 'Customer',
        tableName: 'Customer',
        timestamps: false
      }
    );
  
    return Customer;
  };