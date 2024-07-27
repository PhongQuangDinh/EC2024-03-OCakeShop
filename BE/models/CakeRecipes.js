const { Model } = require('sequelize');
const CakeFilling = require('./CakeFilling');

module.exports = (sequelize, DataTypes) => {
    class CakeRecipes extends Model {
      static associate(models) {
        CakeRecipes.belongsTo(models.CakeSize, { foreignKey: 'cakeSizeID', as: 'cakeSize' });
        CakeRecipes.belongsTo(models.CakeFilling, { foreignKey: 'cakeFillingID', as: 'cakeFilling' });
        CakeRecipes.belongsTo(models.Ingredient, { foreignKey: 'ingredientID', as: 'ingredient' });
        // CakeRecipes.belongsToMany(models.Genre, { through: models.GenreCakeRecipes, foreignKey: 'CakeRecipes' });
        // CakeRecipes.hasMany(models.CakeRecipesTrailer, { foreignKey: 'CakeRecipes'})
        // CakeRecipes.belongsToMany(models.Award, { through: models.AwardCakeRecipes, foreignKey: 'CakeRecipes_id' });
      }

      static async createCakeRecipes(cakeRecipes){
          try {
              const newCakeRecipes = await CakeRecipes.create(cakeRecipes);
              return newCakeRecipes;
          } catch (error) {
              throw new Error(`Error create CakeRecipes`);
          }
      }

      static async getAllCakeRecipes(){
          try {
              const allCakeRecipes = await CakeRecipes.findAll()
              return allCakeRecipes;
          } catch (error) {
              throw new Error(`Error retrieving CakeRecipes`);
          }
      }

      static async updateCakeRecipes(cakeRecipesID, newData){
          try {
              const [updateNewRowsCount] = await CakeRecipes.update(newData,{
                  where: {cakeRecipesID: cakeRecipesID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update CakeRecipes`);
          }
      }
      static async deleteCakeRecipes(cakeRecipesID){
          try {
              const userDelete = await CakeRecipes.findOne({
                  where: {cakeRecipesID: cakeRecipesID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {cakeRecipesID: cakeRecipesID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete CakeRecipes`);
          }
        }

      
    }
  
    CakeRecipes.init(
      {
        cakeRecipesID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cakeSizeID:{
          type: DataTypes.INTEGER,
        },
        quantityBaking:{
            type: DataTypes.INTEGER,
        },
        ingredientID:{
            type: DataTypes.INTEGER,
        },
        cakeFillingID:{
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CakeRecipes',
        tableName: 'CakeRecipes',
        timestamps: false
      }
    );
  
    return CakeRecipes;
  };