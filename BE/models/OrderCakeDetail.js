// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');


// const OrderCakeDetail = sequelize.define('OrderCakeDetail', {
//     orderCakeDetailID:{
//         type: DataTypes.INTEGER,
//         // autoIncrement: true,
//         primaryKey: true,
//     },
//     bakingStatus:{
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
//     cartID:{
//         type: DataTypes.INTEGER,
//     },
//     orderCakeID:{
//         type: DataTypes.INTEGER,
//     }
// },
// {
//     tableName: 'OrderCakeDetail',
//     timestamps: false
// });

// module.exports = OrderCakeDetail;



const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderCakeDetail extends Model {
      static associate(models) {
        // OrderCakeDetail.belongsToMany(models.Genre, { through: models.GenreOrderCakeDetail, foreignKey: 'OrderCakeDetail' });
        // OrderCakeDetail.hasMany(models.OrderCakeDetailTrailer, { foreignKey: 'OrderCakeDetail'})
        // OrderCakeDetail.belongsToMany(models.Award, { through: models.AwardOrderCakeDetail, foreignKey: 'OrderCakeDetail_id' });
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