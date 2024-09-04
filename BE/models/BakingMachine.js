const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BakingMachine extends Model {

  }

  BakingMachine.init(
    {
      bakingMachineID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantityCake: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BakingMachine",
      tableName: "BakingMachine",
      timestamps: false,
    }
  );

  return BakingMachine;
};
