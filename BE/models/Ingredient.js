// const {DataTypes} = require('sequelize');
// const sequelize = require('../config/database');

// const Ingredient = sequelize.define('Ingredient', {
//     ingredientID:{
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
//     quantity:{
//         type: DataTypes.INTEGER,
//     },
//     unit:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 20]
//         },
//     },
//     price:{
//         type: DataTypes.FLOAT,
//     },
//     expirationDate: {
//         type: DataTypes.DATE,
//     },
// },
// {
//     tableName: 'Ingredient',
//     timestamps: false
// });

// module.exports = Ingredient;


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ingredient extends Model {
      static associate(models) {
        // Ingredient.belongsToMany(models.Genre, { through: models.GenreIngredient, foreignKey: 'Ingredient' });
        // Ingredient.hasMany(models.IngredientTrailer, { foreignKey: 'Ingredient'})
        // Ingredient.belongsToMany(models.Award, { through: models.AwardIngredient, foreignKey: 'Ingredient_id' });
      }
    }
  
    Ingredient.init(
      {
        ingredientID:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 30]
            },
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len:[0, 255],
            }
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        unit:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 20]
            },
        },
        price:{
            type: DataTypes.FLOAT,
        },
        expirationDate: {
            type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Ingredient',
        tableName: 'Ingredient',
        timestamps: false
      }
    );
  
    return Ingredient;
  };