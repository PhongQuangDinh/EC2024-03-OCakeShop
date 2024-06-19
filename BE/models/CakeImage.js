const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

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
});

module.exports = CakeImage;