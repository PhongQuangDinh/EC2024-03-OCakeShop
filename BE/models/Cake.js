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
