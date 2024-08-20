const express = require("express");
const router = express.Router();
const model = require('../models');

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.Cake.findAll();

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

// app.post('/pay', (req, res) => {
//   const url = paypal.createOrder(); // pass payment stuff here
//   res.redirect(url);
// });

router.post('/pay', (req, res) => { // put inside form action for submit button
  const url = paypal.createOrder().then(result => {
    res.status(200).json({"check this link": result});
  })
});

router.get('/CONTINUE-ORDER', (req, res) => {
  res.send('Bạn đã mất 100$ :33');
});
router.get('/CANCEL-ORDER', (req, res) => {
  res.send('Bạn ko trả dc ư >:(');
});

module.exports = router;
