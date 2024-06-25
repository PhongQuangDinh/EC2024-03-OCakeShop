const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
      static associate(models) {
        Payment.belongsTo(models.OrderCake, {foreignKey: 'orderCakeID'});
        Payment.belongsTo(models.CreditCard, {foreignKey: 'creditCardID'});
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