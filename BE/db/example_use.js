// NORMAL CODE TO TEST ON EVERY SINGLE TABLE

const model = require('../models');

// model.Cart.findAll().then(res => {
//   console.log(res.map(res => res.dataValues));
// })

// model.Customer.findAll().then(res => {
//   res.forEach(row => {
//     console.log(row.customerID);
//   })
// })

// model.Cart.findAll({include: 'Cake'}).then(res => {
//   console.log(res.map(res => res.dataValues));
// })


// USE REQUIRED: TRUE TO TURN ON INNER JOIN
// model.Customer.findByPk(1,{ include: { model: model.Cart, as: 'Carts', required: true } }).then(res => {
//   if (res) {
//     const customerData = { ...res.dataValues };
//     delete customerData.Carts;
//     console.log(customerData);

//     res.Carts.forEach(cart => {
//       delete cart.dataValues._previousDataValues;
//     });
//     console.log(res.Carts.map(cart => cart.dataValues));
//   } else {
//     console.log('Customer not found');
//   }
// })


model.Purpose.findAll({ where }).then(res => {
  console.log(res.map(res => res.dataValues));
})


// joining 3 tables
// model.Cart.findAll({
//   include: [
//     {
//       model: model.OrderCakeDetail,
//       as: 'OrderCakeDetail',
//       include: model.OrderCake,
//     },
//   ],
// }).then(res => {
//   console.log(res.map(res => res.dataValues));
// });