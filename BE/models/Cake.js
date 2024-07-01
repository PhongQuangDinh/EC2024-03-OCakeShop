const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    static associate(models) {
      Cake.hasMany(models.CakeImage, { foreignKey: "cakeID"});
      Cake.belongsTo(models.Cart, { foreignKey: 'cartID', as: 'cart' });
      Cake.belongsTo(models.CakeSize, { foreignKey: 'cakeSizeID', as: 'cakeSize' });
      Cake.belongsTo(models.CakeFilling, { foreignKey: 'cakeFillingID', as: 'cakeFilling' });
    }
    static async createCake(cake){
        try {
            const newCake = await Cake.create(cake);
            return newCake;
        } catch (error) {
            throw new Error(`Error create Cake`);
        }
    }

    static async getAllCake(){
        try {
            const allCake = await Cake.findAll()
            return allCake;
        } catch (error) {
            throw new Error(`Error retrieving Cake`);
        }
    }

    static async updateCake(cakeID, newData){
        try {
            const [updateNewRowsCount] = await Cake.update(newData,{
                where: {cakeID: cakeID}
            });
            return updateNewRowsCount > 0;
        } catch (error) {
            throw new Error(`Error update Cake`);
        }
    }
    static async deleteCake(cakeID){
        try {
            const userDelete = await Cake.findOne({
                where: {cakeID: cakeID}
            })
            if(!userDelete){
                console.log('User not found');
            }
            const isDelete = await User.destroy({
                where: {cakeID: cakeID}
            })
            return isDelete > 0;
        } catch (error) {
            throw new Error(`Error delete Cake`);
        }
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
        validated: {
          len: [0, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
        validated: {
          len: [0, 255],
        },
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
