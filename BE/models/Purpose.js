const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purpose extends Model {
    static associate(models){
      Purpose.hasMany(models.Cake, {foreignKey: "purposeID", as: "cake", });
      // In your Purpose model
      Purpose.hasMany(models.Purpose, { as: 'children', foreignKey: 'purposeID_ref' });
      Purpose.belongsTo(models.Purpose, { as: 'parent', foreignKey: 'purposeID_ref' });

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
