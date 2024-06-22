// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');

// const Payment = sequelize.define('Payment', {
//     paymentID: {
//         type: DataTypes.INTEGER,
//         // autoIncrement: true,
//         primaryKey: true,
//     },
//     amount:{
//         type: DataTypes.FLOAT,
//     },
//     paymentTime:{
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     },
//     orderCakeID:{
//         type: DataTypes.INTEGER,
//     },
//     creditCardID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'Payment',
//     timestamps: false
// });

// module.exports = Payment;


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
      static associate(models) {
        // Payment.belongsToMany(models.Genre, { through: models.GenrePayment, foreignKey: 'Payment' });
        // Payment.hasMany(models.PaymentTrailer, { foreignKey: 'Payment'})
        // Payment.belongsToMany(models.Award, { through: models.AwardPayment, foreignKey: 'Payment_id' });
      }
    }
  
    Payment.init(
      {
        paymentID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount:{
            type: DataTypes.FLOAT,
        },
        paymentTime:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        orderCakeID:{
            type: DataTypes.INTEGER,
        },
        creditCardID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Payment',
        tableName: 'Payment',
        timestamps: false
      }
    );
  
    return Payment;
  };