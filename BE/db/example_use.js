// NORMAL CODE TO TEST ON EVERY SINGLE TABLE

const model = require('../models');

// model.Customer.findAll().then(res => {
//   res.forEach(row => {
//     console.log(row.customerID);
//   })
// })

// model.Cart.findAll({include: 'Cake'}).then(res => {
//   console.log(res.map(res => res.dataValues));
// })

// model.Cart.findAll({include: 'OrderCakeDetail'}).then(res => {
//   console.log(res.map(res => res.dataValues));
// })


// joining 3 tables
model.Cart.findAll({
  include: [
    {
      model: model.OrderCakeDetail,
      as: 'OrderCakeDetail',
      include: model.OrderCake,
    },
  ],
}).then(res => {
  console.log(res.map(res => res.dataValues));
});
