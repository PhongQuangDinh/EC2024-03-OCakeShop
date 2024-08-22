const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderCake extends Model {
      static associate(models) {
        OrderCake.hasMany(models.OrderCakeDetail, {foreignKey: 'orderCakeID', as: 'OrderDetails'});
        OrderCake.hasOne(models.Payment, {foreignKey: 'orderCakeID'});
      }
    }
  
    OrderCake.init(
      {
        orderCakeID:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderTime:{
            type: DataTypes.DATE,
            defaultValue: Date.now,
        },
        pickUpTime:{
            type: DataTypes.DATE,
            defaultValue: Date.now,
            allowNull: false,
        },
        note:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 255],
            },
        },
        deliveryStatus:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 50],
            },
        },
        receiveStatus:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 50],
            },
        },
        handleStatus:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 50],
            },
        },
      },
      {
        sequelize,
        modelName: 'OrderCake',
        tableName: 'OrderCake',
        timestamps: false
      }
    );
  
    return OrderCake;
  };