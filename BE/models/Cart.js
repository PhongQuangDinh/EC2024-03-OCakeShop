const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
      static associate(models) {
        Cart.belongsTo(models.Customer, { foreignKey: 'customerID', as: 'customer'});
        Cart.belongsTo(models.Cake, { foreignKey: 'cakeID'});
        Cart.hasMany(models.OrderCakeDetail, { foreignKey: 'cartID', as: 'OrderDetails'});
        Cart.belongsTo(models.CakeSize, { foreignKey: 'cakeSizeID', as: 'cakeSize' });
        Cart.belongsTo(models.CakeFilling, { foreignKey: 'cakeFillingID', as: 'cakeFilling' });
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
        cakeSizeID: {
          type: DataTypes.INTEGER,
        },
        cakeFillingID: {
          type: DataTypes.INTEGER,
        },
        priceCake: {
          type: DataTypes.INTEGER,
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