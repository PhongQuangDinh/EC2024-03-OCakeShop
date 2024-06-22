const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeSize extends Model {
      static associate(models) {
        // CakeSize.belongsToMany(models.Genre, { through: models.GenreCakeSize, foreignKey: 'CakeSize' });
        // CakeSize.hasMany(models.CakeSizeTrailer, { foreignKey: 'CakeSize'})
        // CakeSize.belongsToMany(models.Award, { through: models.AwardCakeSize, foreignKey: 'CakeSize_id' });
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