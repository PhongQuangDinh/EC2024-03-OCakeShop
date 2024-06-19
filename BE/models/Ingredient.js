const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Ingredient = sequelize.define('Ingredient', {
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
    tableName: 'Ingredient',
    timestamps: false
});

module.exports = Ingredient;