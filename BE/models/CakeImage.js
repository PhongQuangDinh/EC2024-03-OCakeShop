const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CakeImage extends Model {
    static associate(models) {
      CakeImage.belongsTo(models.Cake, { foreignKey: "cakeID" });
      // CakeImage.hasOne(models.ImageDetail, {foreignKey: "imageID", as: "imageDetail", });
      CakeImage.belongsTo(models.ImageDetail, { as: "imageDetail", foreignKey: "imageID" });
    }
  }

  CakeImage.init(
    {
      cakeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      imageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      isPoster: {
        type: DataTypes.INTEGER,
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
