const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeSize extends Model {
      static associate(models) {
        CakeSize.hasMany(models.Cake, { foreignKey: 'cakeSizeID'})
        CakeSize.hasMany(models.CakeRecipes, { foreignKey: 'cakeSizeID'})
      }
    }
  
    CakeSize.init(
      {
        cakeSizeID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            validated:{
              len:[0, 30]
          },
        },
        timeCook:{
            type: DataTypes.FLOAT
        },
        description:{
            type: DataTypes.STRING,
            validated:{
              len:[0, 255]
          },
        },
        priceSize:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CakeSize',
        tableName: 'CakeSize',
        timestamps: false
      }
    );
  
    return CakeSize;
  };