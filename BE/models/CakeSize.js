const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeSize extends Model {
      static associate(models) {
        CakeSize.hasMany(models.Cake, { foreignKey: 'cakeSizeID'})
        CakeSize.hasMany(models.CakeRecipes, { foreignKey: 'cakeSizeID'})
      }
      static async createCakeSize(cakeSize){
          try {
              const newCakeSize = await CakeSize.create(cakeSize);
              return newCakeSize;
          } catch (error) {
              throw new Error(`Error create CakeSize`);
          }
      }

      static async getAllCakeSize(){
          try {
              const allCakeSize = await CakeSize.findAll()
              return allCakeSize;
          } catch (error) {
              throw new Error(`Error retrieving CakeSize`);
          }
      }

      static async updateCakeSize(cakeSizeID, newData){
          try {
              const [updateNewRowsCount] = await CakeSize.update(newData,{
                  where: {cakeSizeID: cakeSizeID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update CakeSize`);
          }
      }
      static async deleteCakeSize(cakeSizeID){
          try {
              const userDelete = await CakeSize.findOne({
                  where: {cakeSizeID: cakeSizeID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {cakeSizeID: cakeSizeID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete CakeSize`);
          }
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