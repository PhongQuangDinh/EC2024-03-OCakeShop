const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
      static associate(models) {
        Employee.belongsTo(models.User, { foreignKey: 'userID'});
      }
      static async createEmployee(employee){
          try {
              const newEmployee = await Employee.create(employee);
              return newEmployee;
          } catch (error) {
              throw new Error(`Error create Employee`);
          }
      }

      static async getAllEmployee(){
          try {
              const allEmployee = await Employee.findAll()
              return allEmployee;
          } catch (error) {
              throw new Error(`Error retrieving Employee`);
          }
      }

      static async updateEmployee(employeeID, newData){
          try {
              const [updateNewRowsCount] = await Employee.update(newData,{
                  where: {employeeID: employeeID}
              });
              return updateNewRowsCount > 0;
          } catch (error) {
              throw new Error(`Error update Employee`);
          }
      }
      static async deleteEmployee(employeeID){
          try {
              const userDelete = await Employee.findOne({
                  where: {employeeID: employeeID}
              })
              if(!userDelete){
                  console.log('User not found');
              }
              const isDelete = await User.destroy({
                  where: {employeeID: employeeID}
              })
              return isDelete > 0;
          } catch (error) {
              throw new Error(`Error delete Employee`);
          }
      }
    }
  
    Employee.init(
      {
        employeeID: {
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
                len:[0, 50],
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
        roleEmployee:{
            type: DataTypes.STRING,
        },
        userID:{
            type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'Employee',
        timestamps: false
      }
    );
  
    return Employee;
  };