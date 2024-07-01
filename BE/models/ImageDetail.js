// const {DataTypes} = require('sequelize');
// const sequelize = require('../db/dbConfig');
// const Cake = require('./Cake');

// const ImageDetail = sequelize.define('ImageDetail', {
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
//     tableName: 'ImageDetail',
//     timestamps: false
// });

// module.exports = ImageDetail;

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ImageDetail extends Model {}

  ImageDetail.init(
    {
      imageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      imagePath: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ImageDetail",
      tableName: "ImageDetail",
      timestamps: false,
    }
  );

  return ImageDetail;
};
