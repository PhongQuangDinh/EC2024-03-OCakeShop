const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
      static associate(models) {
        Customer.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
        Customer.belongsTo(models.CreditCard, { foreignKey: 'customerID'});

        Customer.hasMany(models.Cart, {foreignKey: 'customerID'});
        // Customer.hasOne(models.Cart, {foreignKey: 'customerID'});
      }

      static async createCustomer(customer){
          try {
              const newCustomer = await Customer.create(customer);
              return newCustomer;
          } catch (error) {
              throw new Error(`Error create customer`);
          }
      }

      static async getAllCustomer(){
          try {
              const allCustomer = await Customer.findAll()
              return allCustomer;
          } catch (error) {
              throw new Error(`Error retrieving customer`);
          }
      }

      static async updateCustomer(customerID, newData){
          try {
              const [updateNewRowsCount] = await Customer.update(newData,{
                  where: {customerID: customerID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update customer`);
          }
      }
      static async deleteCustomer(customerID){
          try {
              const userDelete = await Customer.findOne({
                  where: {customerID: customerID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {customerID: customerID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete customer`);
          }
      }
    }
  
    Customer.init(
      {
        customerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len:[0, 30],
            },
        },
        address:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 255],
            },
        },
        dateOfBirth:{
            type: DataTypes.DATE,
        },
        phoneNumber:{
            type: DataTypes.STRING,
            validate: {
                len:[0, 10],
            },
        },
        userID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Customer',
        tableName: 'Customer',
        timestamps: false
      }
    );
  
    return Customer;
  };