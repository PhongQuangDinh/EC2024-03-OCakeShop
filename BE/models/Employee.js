// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');

// const Employee = sequelize.define('Employee', {
//     employeeID: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 30],
//         },
//     },
//     address:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 50],
//         },
//     },
//     dateOfBirth:{
//         type: DataTypes.DATE,
//     },
//     phoneNumber:{
//         type: DataTypes.STRING,
//         validate: {
//             len:[0, 10],
//         },
//     },
//     roleEmployee:{
//         type: DataTypes.STRING,
//     },
//     userID:{
//         type: DataTypes.INTEGER,
//     },
// },
// {
//     tableName: 'Employee',
//     timestamps: false
// });

// module.exports = Employee;

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
      static associate(models) {
        // Employee.belongsToMany(models.Genre, { through: models.GenreEmployee, foreignKey: 'Employee' });
        // Employee.hasMany(models.EmployeeTrailer, { foreignKey: 'Employee'})
        // Employee.belongsToMany(models.Award, { through: models.AwardEmployee, foreignKey: 'Employee_id' });
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