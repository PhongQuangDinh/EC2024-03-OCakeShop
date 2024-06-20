const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const CakeImage = require('./CakeImage');

const Cake = sequelize.define('Cake', {
    cakeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    priceCake:{
        type: DataTypes.INTEGER,
    },
    purpose:{
        type: DataTypes.STRING,
        validated:{
            len:[0, 100]
        },
    },
    poster_path:{
        type: DataTypes.STRING,
        validated:{
            len:[0, 255]
        },
    },
    cakeFillingID:{
        type: DataTypes.INTEGER,
    },
    cakeSizeID:{
        type: DataTypes.INTEGER,
    },
},
{
    tableName: 'Cake',
    timestamps: false
});

Cake.hasMany(CakeImage, {foreignKey: 'cakeID'});
Cake.belongsTo(CakeImage, {foreign:'cakeID'});

module.exports = Cake;