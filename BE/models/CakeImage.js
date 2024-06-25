const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CakeImage extends Model {
    static associate(models) {
      CakeImage.belongsTo(models.Cake, {
        foreignKey: "cakeID",
      });
    }
  }

  CakeImage.init(
    {
      cakeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      imagePath: {
        type: DataTypes.STRING,
        validated: {
          len: [0, 255],
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "CakeImage",
      tableName: "CakeImage",
      timestamps: false,
    }
  );

  return CakeImage;
};
