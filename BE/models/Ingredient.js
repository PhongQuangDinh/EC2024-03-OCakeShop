const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ingredient extends Model {
      static associate(models) {
        Ingredient.hasMany(models.CakeRecipes, { foreignKey: 'ingredientID' });
      }
      static async createIngredient(ingredient){
          try {
              const newIngredient = await Ingredient.create(ingredient);
              return newIngredient;
          } catch (error) {
              throw new Error(`Error create Ingredient`);
          }
      }

      static async getAllIngredient(){
          try {
              const allIngredient = await Ingredient.findAll()
              return allIngredient;
          } catch (error) {
              throw new Error(`Error retrieving Ingredient`);
          }
      }

      static async updateIngredient(ingredientID, newData){
          try {
              const [updateNewRowsCount] = await Ingredient.update(newData,{
                  where: {ingredientID: ingredientID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update Ingredient`);
          }
      }
      static async deleteIngredient(ingredientID){
          try {
              const userDelete = await Ingredient.findOne({
                  where: {ingredientID: ingredientID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {ingredientID: ingredientID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete Ingredient`);
          }
      }
    }
  
    Ingredient.init(
      {
        ingredientID:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 30]
            },
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len:[0, 255],
            }
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        unit:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 20]
            },
        },
        price:{
            type: DataTypes.FLOAT,
        },
        expirationDate: {
            type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Ingredient',
        tableName: 'Ingredient',
        timestamps: false
      }
    );
  
    return Ingredient;
  };