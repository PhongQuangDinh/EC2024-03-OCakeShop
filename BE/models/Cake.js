// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const CakeImage = require('./CakeImage');
// const Cart = require('./Cart');

// const Cake = sequelize.define('Cake', {
//     cakeID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     priceCake:{
//         type: DataTypes.INTEGER,
//     },
//     purpose:{
//         type: DataTypes.STRING,
//         validated:{
//             len:[0, 100]
//         },
//     },
//     poster_path:{
//         type: DataTypes.STRING,
//         validated:{
//             len:[0, 255]
//         },
//     },
//     cakeFillingID:{
//         type: DataTypes.INTEGER,
//     },
//     cakeSizeID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'Cake',
//     timestamps: false
// });

// Cake.hasOne(Cart, { foreignKey: 'cakeID', as: 'cart' });
// Cake.hasMany(CakeImage, { foreignKey: 'cakeID', as: 'cakeImages' });

// CakeImage.belongsTo(Cake, { foreignKey: 'cakeID', as: 'cake' });
// Cart.belongsTo(Cake, { foreignKey: 'cakeID', as: 'cake' });

// module.exports = Cake;

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    static associate(models) {
      Cake.hasMany(models.CakeImage, {
        foreignKey: "cakeID",
        as: "cakeImages",
      });
    }
  }

  Cake.init(
    {
      cakeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      purpose: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cake",
      tableName: "Cake",
      timestamps: false,
    }
  );

  return Cake;
};
