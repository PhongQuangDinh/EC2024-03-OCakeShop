const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const CakeRecipes = sequelize.define('CakeRecipes', {
    cakeRecipesID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantityBaking:{
        type: DataTypes.INTEGER,
    },
    cakeSizeID:{
        type: DataTypes.INTEGER,
    },
    ingredientID:{
        type: DataTypes.INTEGER,
    },
});

module.exports = CakeRecipes;