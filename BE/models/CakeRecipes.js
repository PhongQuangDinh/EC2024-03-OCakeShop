// const {DataTypes} = require('sequelize');
// const sequelize = require('../config/database');

// const CakeRecipes = sequelize.define('CakeRecipes', {
//     cakeRecipesID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     quantityBaking:{
//         type: DataTypes.INTEGER,
//     },
//     cakeSizeID:{
//         type: DataTypes.INTEGER,
//     },
//     ingredientID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'CakeRecipes',
//     timestamps: false
// });

// module.exports = CakeRecipes;


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeRecipes extends Model {
      static associate(models) {
        // CakeRecipes.belongsToMany(models.Genre, { through: models.GenreCakeRecipes, foreignKey: 'CakeRecipes' });
        // CakeRecipes.hasMany(models.CakeRecipesTrailer, { foreignKey: 'CakeRecipes'})
        // CakeRecipes.belongsToMany(models.Award, { through: models.AwardCakeRecipes, foreignKey: 'CakeRecipes_id' });
      }
    }
  
    CakeRecipes.init(
      {
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
      },
      {
        sequelize,
        modelName: 'CakeRecipes',
        tableName: 'CakeRecipes',
        timestamps: false
      }
    );
  
    return CakeRecipes;
  };