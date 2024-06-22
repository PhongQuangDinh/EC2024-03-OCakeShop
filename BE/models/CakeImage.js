const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Cake = require('./Cake');

const CakeImage = sequelize.define('CakeImage', {
    cakeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    imagePath:{
        type: DataTypes.STRING,
        validated:{
            len:[0, 255]
        },
        primaryKey: true,
    },
},
{
    tableName: 'CakeImage',
    timestamps: false
});

module.exports = CakeImage;