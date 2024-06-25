const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeFilling extends Model {
      static associate(models) {
        // CakeFilling.belongsToMany(models.Genre, { through: models.GenreCakeFilling, foreignKey: 'CakeFilling' });
        // CakeFilling.hasMany(models.CakeFillingTrailer, { foreignKey: 'CakeFilling'})
        // CakeFilling.belongsToMany(models.Award, { through: models.AwardCakeFilling, foreignKey: 'CakeFilling_id' });
      }
    }
  
    CakeFilling.init(
      {
        cakeFillingID: {
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
        priceCakeFilling:{
            type: DataTypes.INTEGER,
        },
        ingredientID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CakeFilling',
        tableName: 'CakeFilling',
        timestamps: false
      }
    );
  
    return CakeFilling;
  };