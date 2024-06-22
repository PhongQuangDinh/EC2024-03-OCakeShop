const model = require('../models');

model.User.findAll().then(res => {
  console.log(res.map(res => res.dataValues));
})