// const {DataTypes} = require('sequelize');
// const sequelize = require('../config/database');
// const OrderCake = require('./OrderCake');
// const OrderCakeDetail = require('./OrderCakeDetail');

// const OrderCake = sequelize.define('OrderCake', {
//     orderCakeID:{
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     orderTime:{
//         type: DataTypes.DATE,
//         defaultValue: Date.now,
//     },
//     pickUpTime:{
//         type: DataTypes.DATE,
//         defaultValue: Date.now,
//         allowNull: false,
//     },
//     note:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 255],
//         },
//     },
//     deliveryStatus:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
//     receiveStatus:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
//     handleStatus:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
// },
// {
//     tableName: 'OrderCake',
//     timestamps: false
// });

// OrderCake.hasOne(OrderCake, {foreignKey: 'orderCakeID', as: 'OrderCake' });
// OrderCake.belongsTo(OrderCake, { foreignKey: 'orderCakeID', as: 'orderCake'});

// OrderCake.hasMany(OrderCakeDetail, {foreignKey: 'orderCakeID', as: 'orderCakeDetail' });
// OrderCakeDetail.belongsTo(OrderCake, { foreignKey: 'orderCakeID', as: 'orderCake'});

// module.exports = OrderCake;



const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderCake extends Model {
      static associate(models) {
        // OrderCake.belongsToMany(models.Genre, { through: models.GenreOrderCake, foreignKey: 'OrderCake' });
        // OrderCake.hasMany(models.OrderCakeTrailer, { foreignKey: 'OrderCake'})
        // OrderCake.belongsToMany(models.Award, { through: models.AwardOrderCake, foreignKey: 'OrderCake_id' });
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