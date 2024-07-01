const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
      static associate(models) {
        Cart.belongsTo(models.Customer, { foreignKey: 'customerID'});

        Cart.belongsTo(models.Cake, { foreignKey: 'cakeID'});
        Cart.hasMany(models.OrderCakeDetail, { foreignKey: 'cartID', as: 'OrderCakeDetail'});
      }
    }
  
    Cart.init(
      {
        cartID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        floor:{
            type: DataTypes.INTEGER,
        },
        additionalDetail:{
            type: DataTypes.STRING,
            validated:{
                len:[0, 255]
            },
        },
        pickUpTime:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status:{
            type: DataTypes.STRING,
            validated:{
                len:[0, 50]
            },
        },
        customerID:{
            type: DataTypes.INTEGER,
        },
        cakeID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Cart',
        tableName: 'Cart',
        timestamps: false
      }
    );
  
    return Cart;
  };