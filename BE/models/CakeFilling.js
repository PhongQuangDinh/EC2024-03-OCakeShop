const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeFilling extends Model {
      static associate(models) {
        CakeFilling.hasMany(models.Cake, { foreignKey: 'cakeFillingID', as: 'cakes' });
        CakeFilling.hasMany(models.CakeRecipes, { foreignKey: 'cakeFillingID', as: 'recipes' });
        // CakeFilling.belongsToMany(models.Genre, { through: models.GenreCakeFilling, foreignKey: 'CakeFilling' });
        // CakeFilling.hasMany(models.CakeFillingTrailer, { foreignKey: 'CakeFilling'})
        // CakeFilling.belongsToMany(models.Award, { through: models.AwardCakeFilling, foreignKey: 'CakeFilling_id' });
      }
      static async createCakeFilling(cakeFilling){
          try {
              const newCakeFilling = await CakeFilling.create(cakeFilling);
              return newCakeFilling;
          } catch (error) {
              throw new Error(`Error create CakeFilling`);
          }
      }

      static async getAllCakeFilling(){
          try {
              const allCakeFilling = await CakeFilling.findAll()
              return allCakeFilling;
          } catch (error) {
              throw new Error(`Error retrieving CakeFilling`);
          }
      }

      static async updateCakeFilling(cakeFillingID, newData){
          try {
              const [updateNewRowsCount] = await CakeFilling.update(newData,{
                  where: {cakeFillingID: cakeFillingID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update CakeFilling`);
          }
      }
      static async deleteCakeFilling(cakeFillingID){
          try {
              const userDelete = await CakeFilling.findOne({
                  where: {cakeFillingID: cakeFillingID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {cakeFillingID: cakeFillingID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete CakeFilling`);
          }
        }
    }
  
    CakeFilling.init(
      {
        cakeFillingID: {
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
        priceCakeFilling:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CakeFilling',
        tableName: 'CakeFilling',
        timestamps: false
      }
    );
  
    return CakeFilling;
  };