const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const CakeImage = require('./CakeImage');
const Cart = require('./Cart');

const Cake = sequelize.define('Cake', {
    cakeID: {
        type: DataTypes.INTEGER,
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

Cake.hasOne(Cart, { foreignKey: 'cakeID', as: 'cart' });
Cake.hasMany(CakeImage, { foreignKey: 'cakeID', as: 'cakeImages' });

CakeImage.belongsTo(Cake, { foreignKey: 'cakeID', as: 'cake' });
Cart.belongsTo(Cake, { foreignKey: 'cakeID', as: 'cake' });

module.exports = Cake;