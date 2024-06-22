// const {DataTypes} = require('sequelize');
// const sequelize = require('../config/database');

// const CakeFilling = sequelize.define('CakeFilling', {
//     cakeFillingID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     title:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 30]
//         },
//     },
//     description: {
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 255],
//         }
//     },
//     priceCakeFilling:{
//         type: DataTypes.INTEGER,
//     },
//     ingredientID:{
//         type: DataTypes.INTEGER,
//     },
// });

// module.exports = CakeFilling;