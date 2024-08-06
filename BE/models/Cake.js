const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    static associate(models) {
<<<<<<< Updated upstream
      Cake.hasMany(models.CakeImage, {
        foreignKey: "cakeID",
        as: "cakeImages",
      });
=======
      
      Cake.hasMany(models.CakeImage, { foreignKey: "cakeID", as: "cakeImages"});
      // Cake.belongsTo(models.Cart, { foreignKey: 'cartID', as: 'cart' });
      Cake.belongsTo(models.CakeSize, { foreignKey: 'cakeSizeID', as: 'cakeSize' });
      Cake.belongsTo(models.CakeFilling, { foreignKey: 'cakeFillingID', as: 'cakeFilling' });
>>>>>>> Stashed changes
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
      purposeID: {
        type: DataTypes.INTEGER,
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
