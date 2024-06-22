const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CreditCard extends Model {
      static associate(models) {
        CreditCard.belongsTo(models.Customer, { foreignKey: 'customerID'});
        CreditCard.hasMany(models.Payment, { foreignKey: 'creditCardID' });
      }
      static async createCreditCard(creditCard){
          try {
              const newCreditCard = await CreditCard.create(creditCard);
              return newCreditCard;
          } catch (error) {
              throw new Error(`Error create CreditCard`);
          }
      }

      static async getAllCreditCard(){
          try {
              const allCreditCard = await CreditCard.findAll()
              return allCreditCard;
          } catch (error) {
              throw new Error(`Error retrieving CreditCard`);
          }
      }

      static async updateCreditCard(creditCardID, newData){
          try {
              const [updateNewRowsCount] = await CreditCard.update(newData,{
                  where: {creditCardID: creditCardID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update CreditCard`);
          }
      }
      static async deleteCreditCard(creditCardID){
          try {
              const userDelete = await CreditCard.findOne({
                  where: {creditCardID: creditCardID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {creditCardID: creditCardID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete CreditCard`);
          }
      }
    }
  
    CreditCard.init(
      {
        creditCardID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        creditSerialNumber: {
            type: DataTypes.STRING,
            validate: {
                len:[0, 30],
            },
        },
        username:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 30],
            },
        },
        bankName:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 50],
            },
        },
        customerID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'CreditCard',
        tableName: 'CreditCard',
        timestamps: false
      }
    );
  
    return CreditCard;
  };