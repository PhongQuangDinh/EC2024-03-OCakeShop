// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const OrderCakeDetail = require('./OrderCakeDetail');

// const Cart = sequelize.define('Cart', {
//     cartID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     quantity:{
//         type: DataTypes.INTEGER,
//     },
//     floor:{
//         type: DataTypes.INTEGER,
//     },
//     additionalDetail:{
//         type: DataTypes.STRING,
//         validated:{
//             len:[0, 255]
//         },
//     },
//     pickUpTime:{
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     },
//     status:{
//         type: DataTypes.STRING,
//         validated:{
//             len:[0, 50]
//         },
//     },
//     customerID:{
//         type: DataTypes.INTEGER,
//     },
//     cakeID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'Cart',
//     timestamps: false
// });

// Cart.hasMany(OrderCakeDetail, { foreignKey: 'cartID', as: 'cart' });
// OrderCakeDetail.belongsTo(Cart, { foreignKey: 'cartID', as: 'orderCakeDetail' });

// module.exports = Cart;



const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
      static associate(models) {
        // Cart.belongsToMany(models.Genre, { through: models.GenreCart, foreignKey: 'Cart' });
        // Cart.hasMany(models.CartTrailer, { foreignKey: 'Cart'})
        // Cart.belongsToMany(models.Award, { through: models.AwardCart, foreignKey: 'Cart_id' });
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