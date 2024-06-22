// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const Cake = require('./Cake');

// const CakeImage = sequelize.define('CakeImage', {
//     cakeID: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//     },
//     imagePath:{
//         type: DataTypes.STRING,
//         validated:{
//             len:[0, 255]
//         },
//         primaryKey: true,
//     },
// },
// {
//     tableName: 'CakeImage',
//     timestamps: false
// });

// module.exports = CakeImage;


const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CakeImage extends Model {
      static associate(models) {
        // CakeImage.belongsToMany(models.Genre, { through: models.GenreCakeImage, foreignKey: 'CakeImage' });
        // CakeImage.hasMany(models.CakeImageTrailer, { foreignKey: 'CakeImage'})
        // CakeImage.belongsToMany(models.Award, { through: models.AwardCakeImage, foreignKey: 'CakeImage_id' });
      }
    }
  
    CakeImage.init(
      {
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
        sequelize,
        modelName: 'CakeImage',
        tableName: 'CakeImage',
        timestamps: false
      }
    );
  
    return CakeImage;
  };