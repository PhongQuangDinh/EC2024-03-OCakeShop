const { Sequelize} = require('sequelize');

const sequelize = new Sequelize('EC2024_03_OCAKE', 'avnadmin', 'AVNS_9gV6-3T192F0fSu44h_', {
    host: 'ec2024-03-ocake-dinhquangphong365.g.aivencloud.com',
    port: 19330,
    dialect: 'mysql',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  });

module.exports = sequelize;