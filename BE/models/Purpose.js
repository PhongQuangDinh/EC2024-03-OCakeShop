const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
    static associate(models){
      Purpose.hasMany(models.Cake, {foreignKey: "purposeID", as: "cake", });
    }
  }

  Purpose.init(
    {
      purposeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      purposeID_ref: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Purpose",
      tableName: "Purpose",
      timestamps: false,
    }
  );

  return Purpose;
};
