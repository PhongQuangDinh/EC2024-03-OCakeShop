const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderCakeDetail extends Model {
      static associate(models) {
        OrderCakeDetail.belongsTo(models.Cart, { foreignKey: 'cartID', as: 'OrderCart'});
        OrderCakeDetail.belongsTo(models.OrderCake, { foreignKey: 'orderCakeID', as: 'OrderDetails'});
      }
    }
  
    OrderCakeDetail.init(
      {
        orderCakeDetailID:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bakingStatus:{
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
        cartID:{
            type: DataTypes.INTEGER,
        },
        orderCakeID:{
            type: DataTypes.INTEGER,
        },
        arrange: {
          type: DataTypes.INTEGER,
        }
      },
      {
        sequelize,
        modelName: 'OrderCakeDetail',
        tableName: 'OrderCakeDetail',
        timestamps: false
      }
    );
  
    return OrderCakeDetail;
  };