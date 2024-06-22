// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const CreditCard = require('./CreditCard');

// const CreditCard = sequelize.define('CreditCard', {
//     creditCardID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     creditSerialNumber: {
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 30],
//         },
//     },
//     username:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 30],
//         },
//     },
//     bankName:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
//     customerID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'CreditCard',
//     timestamps: false
// });

// CreditCard.hasMany(CreditCard, { foreignKey: 'creditCardID', as: 'CreditCard' });
// CreditCard.belongsTo(CreditCard, { foreignKey: 'creditCardID', as: 'creditCard' });

// module.exports = CreditCard;



const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CreditCard extends Model {
      static associate(models) {
        CreditCard.belongsTo(models.Customer, { foreignKey: 'customerID'});
        CreditCard.hasMany(models.Payment, { foreignKey: 'creditCardID' });
      }
    }
  
    CreditCard.init(
      {
        creditCardID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        creditSerialNumber: {
            type: DataTypes.STRING,
            validate: {
                len:[0, 30],
            },
        },
        username:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 30],
            },
        },
        bankName:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 50],
            },
        },
        customerID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CreditCard',
        tableName: 'CreditCard',
        timestamps: false
      }
    );
  
    return CreditCard;
  };