const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    static associate(models) {
      Cake.hasMany(models.CakeImage, { foreignKey: "cakeID"});
    }
  }

  Cake.init(
    {
      cakeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      priceCake: {
        type: DataTypes.INTEGER,
      },
      purpose: {
        type: DataTypes.STRING,
        validated: {
          len: [0, 100],
        },
      },
      poster_path: {
        type: DataTypes.STRING,
        validated: {
          len: [0, 255],
        },
      },
      cakeFillingID: {
        type: DataTypes.INTEGER,
      },
      cakeSizeID: {
        type: DataTypes.INTEGER,
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
