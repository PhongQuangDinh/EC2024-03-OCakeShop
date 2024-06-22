// NORMAL CODE TO TEST ON EVERY SINGLE TABLE

const model = require('../models');

model.CakeSize.findAll().then(res => {
  console.log(res.map(res => res.dataValues));
})